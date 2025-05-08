import { useEffect, useState } from 'react';
import type { Region, TimeOfDay } from '../data/MapData.ts';
import AbilityCheck from './AbilityCheck.tsx';
import Collapsible from './Collapsible.tsx';
import Creature from './Creature.tsx';
import Item from './Item.tsx';
import './RegionDetails.css';
import Trait from './Trait.tsx';

interface OpenCollapsible {
  isOpen: boolean;
  children?: {
    [index: number]: OpenCollapsible;
  };
}

interface OpenCollapsibles {
  descriptions: OpenCollapsible;
  creatures: OpenCollapsible;
  checks: OpenCollapsible;
  items: OpenCollapsible;
  opportunities: OpenCollapsible;
  handouts: OpenCollapsible;
  notes: OpenCollapsible;
}

const allCollapsiblesClosed: OpenCollapsibles = {
  descriptions: {
    isOpen: false,
    children: {},
  },
  creatures: {
    isOpen: false,
    children: {},
  },
  checks: {
    isOpen: false,
    children: {},
  },
  items: {
    isOpen: false,
    children: {},
  },
  opportunities: {
    isOpen: false,
  },
  handouts: {
    isOpen: false,
  },
  notes: {
    isOpen: false,
  },
};

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
    lighting,
    descriptions,
    creatures,
    checks,
    items,
    opportunities,
    handouts,
    notes,
  } = data;

  const [openCollapsibles, setOpenCollapsibles] = useState(
    allCollapsiblesClosed,
  );

  const setIsCollapsibleOpen = (
    key: keyof OpenCollapsibles,
    indexes: number[],
    isOpen: boolean,
  ) => {
    if (indexes.length) {
      const index = indexes.shift()!;
      setOpenCollapsibles({
        ...openCollapsibles,
        [key]: {
          ...openCollapsibles[key],
          children: {
            ...openCollapsibles[key].children,
            [index]: updateIsIndexedCollapsibleOpen(
              openCollapsibles[key].children?.[index] ?? { isOpen: false },
              indexes,
              isOpen,
            ),
          },
        },
      });
    } else {
      setOpenCollapsibles({
        ...openCollapsibles,
        [key]: {
          ...openCollapsibles[key],
          isOpen,
        },
      });
    }
  };

  const updateIsIndexedCollapsibleOpen = (
    existing: OpenCollapsible,
    indexes: number[],
    isOpen: boolean,
  ): OpenCollapsible => {
    if (indexes.length == 0) {
      return {
        isOpen,
      };
    }
    const index = indexes.shift()!;
    return {
      ...existing,
      children: {
        ...existing.children,
        [index]: updateIsIndexedCollapsibleOpen(
          existing.children?.[index] ?? { isOpen: false },
          indexes,
          isOpen,
        ),
      },
    };
  };

  useEffect(() => {
    setOpenCollapsibles(allCollapsiblesClosed);
  }, [regionKey]);

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
          <Collapsible
            headingElement="h2"
            title="Descriptions"
            isOpen={openCollapsibles.descriptions.isOpen}
            onToggleOpen={(isOpen) =>
              setIsCollapsibleOpen('descriptions', [], isOpen)
            }
          >
            {descriptions.map((desc, index) => (
              <div key={`description-${index}`}>
                <Collapsible
                  headingElement="h3"
                  title={desc.prompt}
                  isOpen={
                    openCollapsibles.descriptions.children![index]?.isOpen ??
                    false
                  }
                  onToggleOpen={(isOpen) =>
                    setIsCollapsibleOpen('descriptions', [index], isOpen)
                  }
                >
                  {desc.text}
                </Collapsible>
              </div>
            ))}
          </Collapsible>
        ) : null}

        {creatures?.length ? (
          <Collapsible
            headingElement="h2"
            title="Creatures"
            isOpen={openCollapsibles.creatures.isOpen}
            onToggleOpen={(isOpen) =>
              setIsCollapsibleOpen('creatures', [], isOpen)
            }
          >
            {creatures.map((creature, index) => (
              <div key={`creature-${index}`}>
                <Creature
                  creature={creature}
                  isOpen={
                    openCollapsibles.creatures.children![index]?.isOpen ?? false
                  }
                  onToggleOpen={(isOpen) =>
                    setIsCollapsibleOpen('creatures', [index], isOpen)
                  }
                  headingElement="h3"
                  rolesHeadingElement="h4"
                />
              </div>
            ))}
          </Collapsible>
        ) : null}

        {checks?.length ? (
          <Collapsible
            headingElement="h2"
            title="Ability Checks"
            isOpen={openCollapsibles.checks.isOpen}
            onToggleOpen={(isOpen) =>
              setIsCollapsibleOpen('checks', [], isOpen)
            }
          >
            {checks.map((check, index) => (
              <div key={`check-${index}`}>
                <AbilityCheck
                  check={check}
                  isOpen={
                    openCollapsibles.checks.children![index]?.isOpen ?? false
                  }
                  onToggleOpen={(isOpen) =>
                    setIsCollapsibleOpen('checks', [index], isOpen)
                  }
                  headingElement="h3"
                  prereqsHeadingElement="h4"
                />
              </div>
            ))}
          </Collapsible>
        ) : null}

        {items?.length ? (
          <Collapsible
            headingElement="h2"
            title="Items"
            isOpen={openCollapsibles.items.isOpen}
            onToggleOpen={(isOpen) => setIsCollapsibleOpen('items', [], isOpen)}
          >
            {items.map((itemOrItemGroup, index) =>
              // Check if the item is an item group or a single Item
              'items' in itemOrItemGroup ? (
                <Collapsible
                  key={`item-group-${index}`}
                  isOpen={openCollapsibles.items.children![index]?.isOpen}
                  onToggleOpen={(isOpen) =>
                    setIsCollapsibleOpen('items', [index], isOpen)
                  }
                  headingElement="h3"
                  title={itemOrItemGroup.name}
                >
                  {itemOrItemGroup.notes ? (
                    <ul>
                      {itemOrItemGroup.notes.map((note, noteIndex) => (
                        <li key={`note-${noteIndex}`}>{note}</li>
                      ))}
                    </ul>
                  ) : null}
                  {itemOrItemGroup.items.map((subItem, subIndex) => (
                    <Item
                      key={`item-${index}-${subIndex}`}
                      item={subItem}
                      isOpen={
                        openCollapsibles.items.children![index]?.children?.[
                          subIndex
                        ]?.isOpen ?? false
                      }
                      onToggleOpen={(isOpen) =>
                        setIsCollapsibleOpen('items', [index, subIndex], isOpen)
                      }
                      headingElement="h4"
                    />
                  ))}
                </Collapsible>
              ) : (
                <Item
                  key={`item-${index}`}
                  item={itemOrItemGroup}
                  isOpen={openCollapsibles.items.children![index]?.isOpen}
                  onToggleOpen={(isOpen) =>
                    setIsCollapsibleOpen('items', [index], isOpen)
                  }
                  headingElement="h3"
                />
              ),
            )}
          </Collapsible>
        ) : null}

        {opportunities?.length ? (
          <Collapsible
            headingElement="h2"
            title="Opportunities"
            isOpen={openCollapsibles.opportunities.isOpen}
            onToggleOpen={(isOpen) =>
              setIsCollapsibleOpen('opportunities', [], isOpen)
            }
          >
            <ul>
              {opportunities.map((opportunity, index) => (
                <li key={`opportunity-${index}`}>{opportunity}</li>
              ))}
            </ul>
          </Collapsible>
        ) : null}

        {handouts?.length ? (
          <Collapsible
            headingElement="h2"
            title="Handouts"
            isOpen={openCollapsibles.handouts.isOpen}
            onToggleOpen={(isOpen) =>
              setIsCollapsibleOpen('handouts', [], isOpen)
            }
          >
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
          <Collapsible
            headingElement="h2"
            title="Other Notes"
            isOpen={openCollapsibles.notes.isOpen}
            onToggleOpen={(isOpen) => setIsCollapsibleOpen('notes', [], isOpen)}
          >
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
