import './Map.css';

type MapProps = {
  mapSrc: string;
};

function Map({ mapSrc }: MapProps) {
  return (
    <div id="map">
      <img src={mapSrc} alt="Map" useMap="#map" className="w-100" />
      <map name="map"></map>
    </div>
  );
}

export default Map;
