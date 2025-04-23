import './Map.css';

export type MapArea = {
  shape: string;
  coords: string;
  regionKey: string;
};

export type MapProps = {
  mapSrc: string;
  areas: MapArea[];
  onRegionClick?: (regionKey: string) => void;
};

function Map({ mapSrc, areas, onRegionClick }: MapProps) {
  const handleRegionClick = (
    event: React.MouseEvent<HTMLElement>,
    regionKey: string,
  ) => {
    event.preventDefault();
    if (onRegionClick) {
      onRegionClick(regionKey);
    }
  };

  return (
    <div id="map">
      <img src={mapSrc} alt="Map" useMap="#map" className="w-100" />
      <map name="map">
        {areas.map((area) => (
          <area
            key={area.regionKey}
            shape={area.shape}
            coords={area.coords}
            alt={area.regionKey}
            className="map-area"
            href="#"
            onClick={(e) => handleRegionClick(e, area.regionKey)}
          />
        ))}
      </map>
    </div>
  );
}

export default Map;
