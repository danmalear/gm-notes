import type { Region, TimeOfDay } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';
import './RegionDetails.css';

export interface RegionDetailsProps extends React.PropsWithChildren {
  key: string;
  data: Region;
  timeOfDay: TimeOfDay;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({ key, data }) => {
  return (
    <>
      <div id={key + '-details'} className="region-details card">
        <h1>
          {data.code ? data.code + '. ' : ''}
          {data.name}
        </h1>
        {data.descriptions?.length ? (
          <Collapsible headingElement="h2" title="Descriptions">
            {data.descriptions.map((desc, index) => (
              <div key={`description-${index}`}>
                <Collapsible headingElement="h3" title={desc.prompt}>
                  {desc.text}
                </Collapsible>
              </div>
            ))}
          </Collapsible>
        ) : null}
      </div>
    </>
  );
};

export default RegionDetails;
