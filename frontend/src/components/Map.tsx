import type { Circle, Polygon, Rectangle } from '#dtos/region.ts';
import {
	useCallback,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { RegionContext } from '../contexts/RegionContext.ts';
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
	mapImagePath: string;
	areas: MapArea[];
	onRegionClick?: (regionKey: string) => void;
}

const Map: React.FC<MapProps> = ({
	mapImagePath,
	areas: areasProp,
	onRegionClick,
}) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement | null>(null);

	const onImgLoad = () => {
		setImgLoaded(true);
	};

	const regionState = useContext(RegionContext);

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
			{imgLoaded && !regionState.isEditingRegion ? (
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
			{imgLoaded && regionState.isEditingRegion ? (
				<DrawRegion w={imgRef.current?.width} h={imgRef.current?.height} />
			) : null}
		</>
	);
};

export default Map;
