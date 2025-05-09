import { useEffect, useReducer } from 'react';
import type { Region, TimeOfDay, ValidPartySize } from '../data/MapData.ts';
import collapsiblesReducer from '../reducers/collapsibleReducer.ts';
import AbilityCheck from './AbilityCheck.tsx';
import Collapsible from './Collapsible.tsx';
import Creature from './Creature.tsx';
import Item from './Item.tsx';
import './RegionDetails.css';
import {
  RegionDetailsContext,
  RegionDetailsDispatchContext,
} from './RegionDetailsContext.ts';
import Trait from './Trait.tsx';

export interface RegionDetailsProps extends React.PropsWithChildren {
  regionKey: string;
  data: Region;
  timeOfDay: TimeOfDay;
  partySize: ValidPartySize;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({
  regionKey,
  data,
  timeOfDay,
  partySize,
}) => {
  const {
    code,
    name,
    lighting,
    descriptions,
    creatures,
    checks,
    items,
    opportunities,
    handouts,
    notes,
  } = data;

  const [collapsibles, dispatch] = useReducer(collapsiblesReducer, {
    openCollapsibles: {},
  });

  const handleResetCollapsibles = () => {
    dispatch({
      type: 'collapsiblesReset',
    });
  };

  useEffect(() => {
    handleResetCollapsibles();
  }, [regionKey]);

  return (
    <RegionDetailsContext.Provider value={collapsibles}>
      <RegionDetailsDispatchContext.Provider value={dispatch}>
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
                    partySize={partySize}
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
              {items.map((item, index) =>
                // Check if the item is an item group or a single Item
                item.items ? (
                  <Collapsible
                    key={`item-group-${index}`}
                    headingElement="h3"
                    title={item.name}
                  >
                    {item.notes ? (
                      <ul>
                        {item.notes.map((note, noteIndex) => (
                          <li key={`note-${noteIndex}`}>{note}</li>
                        ))}
                      </ul>
                    ) : null}
                    {item.items.map((subItem, subIndex) => (
                      <Item
                        key={`item-${index}-${subIndex}`}
                        item={subItem}
                        headingElement="h4"
                      />
                    ))}
                  </Collapsible>
                ) : (
                  <Item key={`item-${index}`} item={item} headingElement="h3" />
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
      </RegionDetailsDispatchContext.Provider>
    </RegionDetailsContext.Provider>
  );
};

export default RegionDetails;
