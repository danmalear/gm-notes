import type { Item } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface ItemProps extends React.PropsWithChildren {
  item: Item;
  headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Item: React.FC<ItemProps> = ({ item, ...props }) => {
  const quantity = (item.quantity ?? 1 > 1) ? ` x${item.quantity}` : '';
  const headingText = `${item.name}${quantity}`;

  return item.value || item.notes?.length ? (
    <Collapsible headingElement={props.headingElement} title={headingText}>
      <div>
        {item.value ? <Trait label="Value">{item.value}</Trait> : null}
        {item.notes ? (
          <ul>
            {item.notes.map((note, noteIndex) => (
              <li key={`note-${noteIndex}`}>{note}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Collapsible>
  ) : (
    <props.headingElement>{headingText}</props.headingElement>
  );
};

export default Item;
