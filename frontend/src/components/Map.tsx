import type { Circle, Polygon, Rectangle, Shape } from '#dtos/region.ts';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { filePath } from '../services/fileService.ts';

// @TODO Clean up the canvas stuff

export interface RectArea {
	shape: 'rect';
	coords: Rectangle;
	// @TODO make this a UUID when HC is gone
	regionId: string;
}

// @TODO consider extracting this
const drawRectangle = (
	context: CanvasRenderingContext2D,
	rectangle: Rectangle,
) => {
	const x1 = Math.min(rectangle.x1, rectangle.x2);
	const x2 = Math.max(rectangle.x1, rectangle.x2);
	const width = x2 - x1;

	const y1 = Math.min(rectangle.y1, rectangle.y2);
	const y2 = Math.max(rectangle.y1, rectangle.y2);
	const height = y2 - y1;

	context.strokeRect(x1, y1, width, height);
};

export interface CircleArea {
	shape: 'circle';
	coords: Circle;
	// @TODO make this a UUID when HC is gone
	regionId: string;
}

export interface PolyArea {
	shape: 'poly';
	coords: Polygon;
	// @TODO make this a UUID when HC is gone
	regionId: string;
}

export type MapArea = RectArea | CircleArea | PolyArea;

interface Area {
	shape: string;
	coords: string;
	regionId: string;
}

export interface MapProps extends React.PropsWithChildren {
	mapImagePath: string;
	isEditing: boolean;
	isAddingNewRectangle: boolean;
	areas: MapArea[];
	onRegionClick?: (regionKey: string) => void;
	onNewShapeAdded: (shape: Shape) => void;
}

const Map: React.FC<MapProps> = ({
	mapImagePath,
	isEditing,
	isAddingNewRectangle,
	areas: areasProp,
	onRegionClick,
	onNewShapeAdded,
}) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement | null>(null);

	const onImgLoad = () => {
		setImgLoaded(true);
	};

	const handleRegionClick = (
		event: React.MouseEvent<HTMLElement>,
		regionKey: string,
	) => {
		// This will prevent the click event from firing when it's part of a drag
		if (event.defaultPrevented) return;

		event.preventDefault();
		if (onRegionClick) {
			onRegionClick(regionKey);
		}
	};

	const offsetStyle: React.CSSProperties = {
		position: 'absolute',
		top: imgRef.current?.offsetTop,
		left: imgRef.current?.offsetLeft,
	};

	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [newShape, setNewShape] = useState<Shape | null>(null);

	const isAddingNewShape = useMemo(
		// @TODO add other shapes
		() => isAddingNewRectangle,
		[isAddingNewRectangle],
	);

	const clearCanvas = useCallback(() => {
		if (!context || !imgRef.current) {
			console.error('ERROR: clearCanvas called in an invalid UI state.');
			return;
		}
		context?.clearRect(0, 0, imgRef.current.width, imgRef.current.height);
	}, [context]);

	useEffect(() => {
		if (imgLoaded && isEditing) {
			const canvas =
				document.querySelector<HTMLCanvasElement>('#region-canvas');
			if (!canvas) {
				console.error('ERROR: Region canvas not found');
				return;
			}

			const newContext = canvas.getContext('2d');
			if (newContext) {
				newContext.strokeStyle = 'green';
				newContext.lineWidth = 15;
			}
			setContext(newContext);
		}
	}, [imgLoaded, isEditing]);

	useEffect(() => {
		if (isAddingNewShape) {
			// @TODO this is just for testing
			setNewShape({
				x1: 500,
				y1: 500,
				x2: 700,
				y2: 700,
			});
		}
	}, [isAddingNewShape]);

	useEffect(() => {
		// @TODO this is for testing
		if (context && newShape && 'x1' in newShape) {
			drawRectangle(context, newShape);
			setTimeout(() => {
				clearCanvas();
				onNewShapeAdded(newShape);
				setNewShape(null);
			}, 2000);
		}
	}, [newShape, context, onNewShapeAdded, clearCanvas]);

	// #region relative coords
	const [areas, setAreas] = useState<Area[]>([]);

	const makeCoordsRelative = useCallback((shape: Shape) => {
		if (imgRef?.current) {
			const imgWidth = imgRef.current.width;
			const imgHeight = imgRef.current.height;

			const isCircle = 'r' in shape;
			const isRect = 'x1' in shape;
			const isPoly = 'coords' in shape;
			if (isCircle) {
				const { x, y, r } = shape;

				const relativeX = (x / imgRef.current.naturalWidth) * imgWidth;
				const relativeY = (y / imgRef.current.naturalHeight) * imgHeight;
				const relativeR = (r / imgRef.current.naturalWidth) * imgWidth;

				return `${relativeX},${relativeY},${relativeR}`;
			}
			if (isRect) {
				const { x1, y1, x2, y2 } = shape;

				const relativeX1 = (x1 / imgRef.current.naturalWidth) * imgWidth;
				const relativeY1 = (y1 / imgRef.current.naturalHeight) * imgHeight;
				const relativeX2 = (x2 / imgRef.current.naturalWidth) * imgWidth;
				const relativeY2 = (y2 / imgRef.current.naturalHeight) * imgHeight;
				return `${relativeX1},${relativeY1},${relativeX2},${relativeY2}`;
			}
			if (isPoly) {
				const { coords } = shape;

				const coordsStrings: string[] = [];
				for (const pair of coords) {
					const { x, y } = pair;
					const relativeX = (x / imgRef.current.naturalWidth) * imgWidth;
					const relativeY = (y / imgRef.current.naturalHeight) * imgHeight;
					coordsStrings.push(`${relativeX},${relativeY}`);
				}
				return coordsStrings.join(',');
			}
			return '';
		} else {
			console.error('Image not found in the DOM');
			return undefined;
		}
	}, []);

	const makeAreasRelative = useCallback(
		(areas: MapArea[]) => {
			const newAreas: Area[] = areas.map((a) => ({
				shape: a.shape,
				coords: makeCoordsRelative(a.coords) || '',
				regionId: a.regionId,
			}));

			return newAreas;
		},
		[makeCoordsRelative],
	);

	const updateAreas = useCallback(() => {
		if (imgLoaded) {
			setAreas(makeAreasRelative(areasProp));
		}
	}, [areasProp, makeAreasRelative, imgLoaded]);

	useLayoutEffect(() => {
		updateAreas();
		window.addEventListener('resize', updateAreas);
		return () => window.removeEventListener('resize', updateAreas);
	}, [updateAreas]);

	// #endregion relative coords

	return (
		<>
			<img
				ref={imgRef}
				src={filePath(mapImagePath)}
				alt="Map"
				useMap={imgLoaded ? '#map' : undefined}
				style={{
					maxHeight: 1500,
					maxWidth: 1500,
				}}
				onLoad={onImgLoad}
			/>
			{imgLoaded && !isEditing ? (
				<map id="map" name="map">
					{areas.map((area, index) => (
						<area
							key={`${area.regionId}-${index}-area`}
							shape={area.shape}
							coords={area.coords}
							alt={area.regionId}
							className="map-area"
							href="#"
							onClick={(e) => handleRegionClick(e, area.regionId)}
						/>
					))}
				</map>
			) : null}
			{imgLoaded && isEditing ? (
				<>
					<canvas
						id="region-canvas"
						style={{
							zIndex: 1,
							...offsetStyle,
						}}
						height={imgRef.current?.height}
						width={imgRef.current?.width}
					/>
				</>
			) : null}
		</>
	);
};

export default Map;
