import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Coords } from '../data/MapData';
import { filePath } from '../services/fileService';

export interface MapArea {
	shape: string;
	coords: Coords;
	regionId: string;
}

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
			{imgLoaded ? (
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
		</>
	);
};

export default Map;
