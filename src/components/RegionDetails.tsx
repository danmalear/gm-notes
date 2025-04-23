import type { Region } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';
import './RegionDetails.css';

export interface RegionDetailsProps extends React.PropsWithChildren {
  key: string;
  data: Region;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({ key, data }) => {
  return (
    <>
      <div id={key + '-details'} className="region-details card">
        <h1>
          {data.code ? data.code + '. ' : ''}
          {data.name}
        </h1>
        {data.description ? (
          <Collapsible title="Description" open={false}>
            <p>{data.description}</p>
          </Collapsible>
        ) : null}
      </div>
    </>
  );
};

export default RegionDetails;
