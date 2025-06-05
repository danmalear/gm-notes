import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Coords, MapImage } from '../data/MapData';

export interface MapArea {
	shape: string;
	coords: Coords;
	regionKey: string;
}

interface Area {
	shape: string;
	coords: string;
	regionKey: string;
}

export interface MapProps extends React.PropsWithChildren {
	mapImage: MapImage;
	areas: MapArea[];
	onRegionClick?: (regionKey: string) => void;
}

const Map: React.FC<MapProps> = ({
	mapImage,
	areas: areasProp,
	onRegionClick,
}) => {
	const [imgLoaded, setImgLoaded] = useState(false);

	const onImgLoad = () => {
		setImgLoaded(true);
	};

	const handleRegionClick = (
		event: React.MouseEvent<HTMLElement>,
		regionKey: string,
	) => {
		event.preventDefault();
		if (onRegionClick) {
			onRegionClick(regionKey);
		}
	};

	// #region relative coords
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [areas, setAreas] = useState<Area[]>([]);

	const makeCoordsRelative = useCallback(
		(coords: Coords) => {
			if (imgRef?.current) {
				const imgWidth = imgRef.current.width;
				const imgHeight = imgRef.current.height;

				const isCircle = 'r' in coords;
				if (isCircle) {
					const { x, y, r } = coords;

					const relativeX = (x / mapImage.sizeX) * imgWidth;
					const relativeY = (y / mapImage.sizeY) * imgHeight;
					const relativeR = (r / mapImage.sizeX) * imgWidth;

					return `${relativeX},${relativeY},${relativeR}`;
				} else {
					const { x1, y1, x2, y2 } = coords;

					const relativeX1 = (x1 / mapImage.sizeX) * imgWidth;
					const relativeY1 = (y1 / mapImage.sizeY) * imgHeight;
					const relativeX2 = (x2 / mapImage.sizeX) * imgWidth;
					const relativeY2 = (y2 / mapImage.sizeY) * imgHeight;
					return `${relativeX1},${relativeY1},${relativeX2},${relativeY2}`;
				}
			} else {
				console.error('Image not found in the DOM');
				return undefined;
			}
		},
		[mapImage.sizeX, mapImage.sizeY],
	);

	const makeAreasRelative = useCallback(
		(areas: MapArea[]) => {
			const newAreas: Area[] = areas.map((a) => ({
				shape: a.shape,
				coords: makeCoordsRelative(a.coords) || '',
				regionKey: a.regionKey,
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
		<div id="map-container">
			<img
				ref={imgRef}
				src={mapImage.src}
				alt="Map"
				useMap={imgLoaded ? '#map' : undefined}
				className="w-100"
				onLoad={onImgLoad}
			/>
			{imgLoaded ? (
				<map id="map" name="map">
					{areas.map((area, index) => (
						<area
							key={`${area.regionKey}-${index}-area`}
							shape={area.shape}
							coords={area.coords}
							alt={area.regionKey}
							className="map-area"
							href="#"
							onClick={(e) => handleRegionClick(e, area.regionKey)}
						/>
					))}
				</map>
			) : null}
		</div>
	);
};

export default Map;
