import { useState } from 'react';
import './App.css';
import DetailCard from './components/DetailCard.tsx';
import Map from './components/Map.tsx';
import data from './data/data.ts';

function App() {
  const [currentMap] = useState('deathHouse');
  const [mapData] = useState(data[currentMap]);

  return (
    <div id="main" className="container">
      <div id="map-col" className="item">
        <Map mapSrc={mapData.imgSrc} />
      </div>
      <div id="detail-col" className="item">
        <div className="region-data">
          <DetailCard />
        </div>
      </div>
    </div>
  );
}

export default App;
