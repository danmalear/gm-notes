import type {
	Circle,
	Polygon,
	Rectangle,
	RegionCreate,
	RegionStub,
	Shape,
} from '#dtos/region.ts';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { makeCoordsRelative, stringifyCoords } from '../helpers/shapes.ts';
import { filePath } from '../services/fileService.ts';
import DrawRegion from './DrawRegion.tsx';

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
	region: RegionStub | RegionCreate | null;
	mapImagePath: string;
	isEditing: boolean;
	isAddingNewRectangle: boolean;
	areas: MapArea[];
	onRegionClick?: (regionKey: string) => void;
	onNewShapeAdded: (shape: Shape) => void;
}

const Map: React.FC<MapProps> = ({
	region,
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
				<DrawRegion
					w={imgRef.current?.width}
					h={imgRef.current?.height}
					existingShapes={region?.rectangles ?? []}
					isAddingRectangle={isAddingNewRectangle}
					onShapeAdded={onNewShapeAdded}
				/>
			) : null}
		</>
	);
};

export default Map;
