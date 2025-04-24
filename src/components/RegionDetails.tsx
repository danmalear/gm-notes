import type { Region, TimeOfDay } from '../data/MapData.ts';
import AbilityCheck from './AbilityCheck.tsx';
import Collapsible from './Collapsible.tsx';
import Creature from './Creature.tsx';
import Item from './Item.tsx';
import './RegionDetails.css';
import Trait from './Trait.tsx';

export interface RegionDetailsProps extends React.PropsWithChildren {
  regionKey: string;
  data: Region;
  timeOfDay: TimeOfDay;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({
  regionKey,
  data,
  timeOfDay,
}) => {
  const {
    code,
    name,
    descriptions,
    lighting,
    creatures,
    checks,
    items,
    opportunities,
    handouts,
    notes,
  } = data;

  return (
    <>
      <div id={regionKey + '-details'} className="region-details card">
        <h1>
          {code ? code + '. ' : ''}
          {name}
        </h1>

        {lighting ? (
          <Trait label="Lighting">{lighting[timeOfDay]}</Trait>
        ) : null}

        {descriptions?.length ? (
          <Collapsible headingElement="h2" title="Descriptions">
            {descriptions.map((desc, index) => (
              <div key={`description-${index}`}>
                <Collapsible headingElement="h3" title={desc.prompt}>
                  {desc.text}
                </Collapsible>
              </div>
            ))}
          </Collapsible>
        ) : null}

        {creatures?.length ? (
          <Collapsible headingElement="h2" title="Creatures">
            {creatures.map((creature, index) => (
              <div key={`creature-${index}`}>
                <Creature
                  creature={creature}
                  headingElement="h3"
                  rolesHeadingElement="h4"
                />
              </div>
            ))}
          </Collapsible>
        ) : null}

        {checks?.length ? (
          <Collapsible headingElement="h2" title="Ability Checks">
            {checks.map((check, index) => (
              <div key={`check-${index}`}>
                <AbilityCheck
                  check={check}
                  headingElement="h3"
                  prereqsHeadingElement="h4"
                />
              </div>
            ))}
          </Collapsible>
        ) : null}

        {items?.length ? (
          <Collapsible headingElement="h2" title="Items">
            {items.map((itemOrItemGroup, index) =>
              // Check if the item is an item group or a single Item
              'items' in itemOrItemGroup ? (
                <Collapsible
                  key={`item-group-${index}`}
                  headingElement="h3"
                  title={itemOrItemGroup.name}
                >
                  {itemOrItemGroup.items.map((subItem, subIndex) => (
                    <Item
                      key={`item-${index}-${subIndex}`}
                      item={subItem}
                      headingElement="h4"
                    />
                  ))}
                </Collapsible>
              ) : (
                <Item
                  key={`item-${index}`}
                  item={itemOrItemGroup}
                  headingElement="h3"
                />
              ),
            )}
          </Collapsible>
        ) : null}

        {opportunities?.length ? (
          <Collapsible headingElement="h2" title="Opportunities">
            <ul>
              {opportunities.map((opportunity, index) => (
                <li key={`opportunity-${index}`}>{opportunity}</li>
              ))}
            </ul>
          </Collapsible>
        ) : null}

        {handouts?.length ? (
          <Collapsible headingElement="h2" title="Handouts">
            <ul>
              {handouts.map((handout, index) => (
                <li key={`handout-${index}`}>
                  {handout.url ? (
                    <a href={handout.url} target="_blank">
                      {handout.text}
                    </a>
                  ) : (
                    handout.text
                  )}
                </li>
              ))}
            </ul>
          </Collapsible>
        ) : null}

        {notes?.length ? (
          <Collapsible headingElement="h2" title="Other Notes">
            <ul>
              {notes.map((note, index) => (
                <li key={`region-note-${index}`}>{note}</li>
              ))}
            </ul>
          </Collapsible>
        ) : null}
      </div>
    </>
  );
};

export default RegionDetails;
