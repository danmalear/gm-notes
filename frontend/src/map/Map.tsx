import { filePath } from '#file/file-service.ts';
import DrawRegion from '#region/DrawRegion.tsx';
import { RegionContext } from '#region/RegionContext.ts';
import type { Circle, Polygon, Rectangle } from '#region/shape/shape-types.ts';
import { scaleShape, stringifyCoords } from '#region/shape/shape-utils.ts';
import {
	useCallback,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { href, useNavigate } from 'react-router';
import { MapContext, MapDispatchContext } from './MapContext.ts';

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
}

const Map: React.FC<MapProps> = ({ mapImagePath, areas: areasProp }) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement | null>(null);

	const mapDispatch = useContext(MapDispatchContext);
	const map = useContext(MapContext).map;
	const regionState = useContext(RegionContext);

	const onImgLoad = () => {
		setImgLoaded(true);
		if (imgRef?.current) {
			const img = imgRef?.current;
			mapDispatch({
				type: 'loaded_image',
				width: img.width,
				height: img.height,
			});
		}
	};

	const navigate = useNavigate();

	const handleRegionClick = (
		event: React.MouseEvent<HTMLElement>,
		regionId: string,
	) => {
		// This will prevent the click event from firing when it's part of a drag
		if (event.defaultPrevented) return;

		event.preventDefault();
		navigate(href('region/:regionId', { regionId }));
	};

	// #region coords
	const [areas, setAreas] = useState<Area[]>([]);

	const updateAreas = useCallback(() => {
		if (imgRef?.current) {
			const img = imgRef.current;
			const newAreas: Area[] = areasProp.map((a) => {
				const relativeCoords = scaleShape(a.coords, {
					from: {
						width: map.width,
						height: map.height,
					},
					to: {
						width: img.width,
						height: img.height,
					},
				});
				return {
					shape: a.shape,
					coords: stringifyCoords(relativeCoords),
					regionId: a.regionId,
				};
			});

			return setAreas(newAreas);
		}
	}, [areasProp, map.width, map.height]);

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
