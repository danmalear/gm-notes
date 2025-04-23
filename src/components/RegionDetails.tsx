import type { RegionData } from '../data/MapData.ts';
import './RegionDetails.css';

export interface RegionDetailsProps {
  data: RegionData;
}

function RegionDetails({ data }: RegionDetailsProps) {
  return (
    <>
      <div className="card">
        <h1>{data.name}</h1>
        <p>data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
        <h2>H2</h2>
        <p>more data</p>
      </div>
    </>
  );
}

export default RegionDetails;
