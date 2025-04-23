import { useState } from 'react';
import './App.css';
import Map, { MapArea } from './components/Map.tsx';
import RegionDetails from './components/RegionDetails.tsx';
import data from './data/data.ts';

function App() {
  const [currentMap] = useState('deathHouse');
  const [currentRegion, setCurrentRegion] = useState('foyer');
  const mapData = data[currentMap];

  const areas: MapArea[] = [];

  for (const region in mapData.regions) {
    for (const area of mapData.regions[region].areas) {
      areas.push({
        shape: area.shape,
        coords: area.coords,
        regionKey: region,
      });
    }
  }

  const handleRegionClick = (regionKey: string) => {
    setCurrentRegion(regionKey);
  };

  return (
    <div id="main" className="container">
      <div id="map-col" className="item">
        <Map
          mapImage={mapData.image}
          areas={areas}
          onRegionClick={handleRegionClick}
        />
      </div>
      <div id="detail-col" className="item">
        <div className="region-data">
          <RegionDetails data={mapData.regions[currentRegion]} />
        </div>
      </div>
    </div>
  );
}

export default App;
