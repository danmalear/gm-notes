import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Coords } from '../data/MapData';
import { filePath } from '../services/fileService';

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

	const makeCoordsRelative = useCallback((coords: Coords) => {
		if (imgRef?.current) {
			const imgWidth = imgRef.current.width;
			const imgHeight = imgRef.current.height;

			const isCircle = 'r' in coords;
			if (isCircle) {
				const { x, y, r } = coords;

				const relativeX = (x / imgRef.current.naturalWidth) * imgWidth;
				const relativeY = (y / imgRef.current.naturalHeight) * imgHeight;
				const relativeR = (r / imgRef.current.naturalWidth) * imgWidth;

				return `${relativeX},${relativeY},${relativeR}`;
			} else {
				const { x1, y1, x2, y2 } = coords;

				const relativeX1 = (x1 / imgRef.current.naturalWidth) * imgWidth;
				const relativeY1 = (y1 / imgRef.current.naturalHeight) * imgHeight;
				const relativeX2 = (x2 / imgRef.current.naturalWidth) * imgWidth;
				const relativeY2 = (y2 / imgRef.current.naturalHeight) * imgHeight;
				return `${relativeX1},${relativeY1},${relativeX2},${relativeY2}`;
			}
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
				src={filePath(mapImagePath)}
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
