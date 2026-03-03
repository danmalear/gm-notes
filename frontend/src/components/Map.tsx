import type { Circle, Polygon, Rectangle, Shape } from '#dtos/region.ts';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { filePath } from '../services/fileService.ts';

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
	areas: MapArea[];
	onRegionClick?: (regionKey: string) => void;
}

const Map: React.FC<MapProps> = ({
	mapImagePath,
	isEditing,
	areas: areasProp,
	onRegionClick,
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

	const offsetStyle: React.CSSProperties = useMemo(
		() => ({
			position: 'absolute',
			top: imgRef.current?.offsetTop,
			left: imgRef.current?.offsetLeft,
		}),
		[imgRef],
	);

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
