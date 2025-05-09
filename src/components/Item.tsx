import type { Item } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface ItemProps extends React.PropsWithChildren {
  item: Item;
  headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
  subHeadingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Item: React.FC<ItemProps> = ({ item, ...props }) => {
  const headingText = (item: Item) => {
    const quantityText = (item.quantity ?? 1 > 1) ? ` x${item.quantity}` : '';
    return `${item.name}${quantityText}`;
  };

  return item.value || item.notes?.length || item.items?.length ? (
    <Collapsible
      headingElement={props.headingElement}
      title={headingText(item)}
    >
      {item.value ? <Trait label="Value">{item.value}</Trait> : null}
      {item.notes ? (
        <ul>
          {item.notes.map((note, noteIndex) => (
            <li key={`note-${noteIndex}`}>{note}</li>
          ))}
        </ul>
      ) : null}
      {item.items?.map((subItem, subIndex) =>
        subItem.value || subItem.notes?.length ? (
          <Collapsible
            key={`item-${item.name}-${subIndex}`}
            headingElement={props.subHeadingElement}
            title={headingText(subItem)}
          >
            <div>
              {subItem.value ? <Trait label="Value">{item.value}</Trait> : null}
              {subItem.notes ? (
                <ul>
                  {subItem.notes.map((note, noteIndex) => (
                    <li key={`note-${noteIndex}`}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Collapsible>
        ) : (
          <props.subHeadingElement>
            {headingText(subItem)}
          </props.subHeadingElement>
        ),
      )}
    </Collapsible>
  ) : (
    <props.headingElement>{headingText(item)}</props.headingElement>
  );
};

export default Item;
