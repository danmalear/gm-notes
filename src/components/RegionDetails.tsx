import type { Region } from '../data/MapData.ts';
import './RegionDetails.css';

export interface RegionDetailsProps extends React.PropsWithChildren {
  data: Region;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({ data }) => {
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
};

export default RegionDetails;
