import { useRef, useState } from 'react';
import type { Coords, MapImage } from '../data/MapData';
import './Map.css';

export type MapArea = {
  shape: string;
  coords: Coords;
  regionKey: string;
};

export interface MapProps extends React.PropsWithChildren {
  mapImage: MapImage;
  areas: MapArea[];
  onRegionClick?: (regionKey: string) => void;
}

const Map: React.FC<MapProps> = ({ mapImage, areas, onRegionClick }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
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

  const relativeCoords = ({ x1, y1, x2, y2 }: Coords) => {
    if (imgRef?.current && imgLoaded) {
      const imgWidth = imgRef.current.width;
      const imgHeight = imgRef.current.height;

      const relativeX1 = (x1 / mapImage.sizeX) * imgWidth;
      const relativeY1 = (y1 / mapImage.sizeY) * imgHeight;
      const relativeX2 = (x2 / mapImage.sizeX) * imgWidth;
      const relativeY2 = (y2 / mapImage.sizeY) * imgHeight;

      return `${relativeX1},${relativeY1},${relativeX2},${relativeY2}`;
    } else {
      console.error('Image not found in the DOM');
      return `${x1},${y1},${x2},${y2}`; // Fallback to original coords if image is not found
    }
  };

  return (
    <div id="map">
      <img
        ref={imgRef}
        src={mapImage.src}
        alt="Map"
        useMap={imgLoaded ? '#map' : undefined}
        className="w-100"
        onLoad={onImgLoad}
      />
      {imgLoaded ? (
        <map name="map">
          {areas.map((area) => (
            <area
              key={area.regionKey}
              shape={area.shape}
              coords={relativeCoords(area.coords)}
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
