import type { Circle, Polygon, Rectangle, Shape } from '#dtos/region.ts';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { makeCoordsRelative } from '../helpers/draw-shapes.ts';
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

	// #region coords
	const [areas, setAreas] = useState<Area[]>([]);

	const stringifyCoords = (shape: Shape) => {
		const isCircle = 'r' in shape;
		const isRect = 'x1' in shape;
		const isPoly = 'coords' in shape;
		if (isCircle) {
			const { x, y, r } = shape;
			return `${x},${y},${r}`;
		}
		if (isRect) {
			const { x1, y1, x2, y2 } = shape;

			return `${x1},${y1},${x2},${y2}`;
		}
		if (isPoly) {
			const { coords } = shape;

			const coordsStrings: string[] = [];
			for (const pair of coords) {
				const { x, y } = pair;
				coordsStrings.push(`${x},${y}`);
			}
			return coordsStrings.join(',');
		} else {
			throw Error('Image not found in the DOM');
		}
	};

	const updateAreas = useCallback(() => {
		if (imgRef?.current) {
			const img = imgRef?.current;
			const newAreas: Area[] = areasProp.map((a) => {
				const relativeCoords = makeCoordsRelative(img, a.coords);
				return {
					shape: a.shape,
					coords: stringifyCoords(relativeCoords),
					regionId: a.regionId,
				};
			});

			return setAreas(newAreas);
		}
	}, [areasProp]);

	useLayoutEffect(() => {
		updateAreas();
		window.addEventListener('resize', updateAreas);
		return () => window.removeEventListener('resize', updateAreas);
	}, [updateAreas]);

	// #endregion coords

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
