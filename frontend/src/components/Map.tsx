import type {
	Circle,
	Coords,
	Polygon,
	Rectangle,
	Shape,
} from '#dtos/region.ts';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { filePath } from '../services/fileService.ts';
import DrawRegions from './DrawRegions.tsx';

export interface RectArea {
	shape: 'rect';
	coords: Rectangle;
	// @TODO make this a UUID when HC is gone
	regionId: string;
}

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

	const makeCoordsStatic = useCallback((shape: Shape): Shape => {
		if (imgRef?.current) {
			const imgWidth = imgRef.current.width;
			const imgHeight = imgRef.current.height;

			const isCircle = 'r' in shape;
			const isRect = 'x1' in shape;
			const isPoly = 'coords' in shape;
			if (isCircle) {
				const { x, y, r } = shape;

				return {
					x: (x / imgWidth) * imgRef.current.naturalWidth,
					y: (y / imgHeight) * imgRef.current.naturalHeight,
					r: (r / imgWidth) * imgRef.current.naturalWidth,
				};
			}
			if (isRect) {
				const { x1, y1, x2, y2 } = shape;

				return {
					x1: (x1 / imgWidth) * imgRef.current.naturalWidth,
					y1: (y1 / imgHeight) * imgRef.current.naturalHeight,
					x2: (x2 / imgWidth) * imgRef.current.naturalWidth,
					y2: (y2 / imgHeight) * imgRef.current.naturalHeight,
				};
			}
			if (isPoly) {
				const { coords } = shape;

				const coordsStrings: Coords[] = [];
				for (const pair of coords) {
					const { x, y } = pair;
					coordsStrings.push({
						x: (x / imgWidth) * imgRef.current.naturalWidth,
						y: (y / imgHeight) * imgRef.current.naturalHeight,
					});
				}
				return { coords };
			}
			throw Error('Invalid shape specified');
		} else {
			throw Error('Image not found in the DOM');
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
				<DrawRegions
					w={imgRef.current?.width}
					h={imgRef.current?.height}
					isAddingRectangle={isAddingNewRectangle}
					onRectangleAdded={onNewShapeAdded}
				/>
			) : null}
		</>
	);
};

export default Map;
