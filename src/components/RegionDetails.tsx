import type { Region } from '../data/MapData.ts';
import './RegionDetails.css';

export interface RegionDetailsProps {
  data: Region;
}

function RegionDetails({ data }: RegionDetailsProps) {
  return (
    <>
      <div id={data.code + '-details'} className="region-details card">
        <h1>
          {data.code ? data.code + '. ' : ''}
          {data.name}
        </h1>
        <h2>Description</h2>
        <p>{data.description}</p>
      </div>
    </>
  );
}

export default RegionDetails;
