import type { Item } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface ItemProps extends React.PropsWithChildren {
  item: Item;
  headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Item: React.FC<ItemProps> = ({ item, headingElement }) => {
  return (
    <Collapsible headingElement={headingElement} title={item.name}>
      <div>
        {item.quantity ? <Trait label="Quantity">{item.quantity}</Trait> : null}
        {item.notes ? (
          <ul>
            {item.notes.map((note, noteIndex) => (
              <li key={`note-${noteIndex}`}>{note}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Collapsible>
  );
};

export default Item;
