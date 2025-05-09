import { useState } from 'react';
import './App.css';
import Map, { MapArea } from './components/Map.tsx';
import RegionDetails from './components/RegionDetails.tsx';
import data from './data/data.ts';
import { ValidPartySize, type TimeOfDay } from './data/MapData.ts';

function App() {
  const [currentMap, setCurrentMap] = useState('deathHouse');
  const [currentRegion, setCurrentRegion] = useState('foyer');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [partySize] = useState<ValidPartySize>(3);
  const mapData = currentMap ? data[currentMap] : null;

  if (!mapData) {
    return (
      <div id="main" className="container">
        <div id="map-col" className="item">
          <div className="pos-absolute l-1 t-1">
            <select
              className="w-10"
              value={currentMap}
              onChange={(e) => setCurrentMap(e.target.value)}
            >
              <option value="">--</option>
              <option value="deathHouse">Death House</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="pos-absolute l-1 t-1 w-10">
          <select
            className="w-100"
            value={currentMap}
            onChange={(e) => setCurrentMap(e.target.value)}
          >
            <option value="">--</option>
            <option value="deathHouse">Death House</option>
          </select>
        </div>
        <div className="pos-absolute l-15 t-1 w-10">
          <select
            className="w-100"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
          >
            <option value="day">Day</option>
            <option value="between">Between</option>
            <option value="night">Night</option>
          </select>
        </div>
        <Map
          mapImage={mapData.image}
          areas={areas}
          onRegionClick={handleRegionClick}
        />
      </div>
      <div id="detail-col" className="item">
        <div className="region-data">
          <RegionDetails
            regionKey={currentRegion}
            data={mapData.regions[currentRegion]}
            timeOfDay={timeOfDay}
            partySize={partySize}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
