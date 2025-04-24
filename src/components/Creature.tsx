import type { Creature } from '../data/MapData';
import Collapsible from './Collapsible';
import Trait from './Trait';

export interface CreatureProps extends React.PropsWithChildren {
  creature: Creature;
  headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Creature: React.FC<CreatureProps> = ({ creature, headingElement }) => {
  return (
    <Collapsible
      headingElement={headingElement}
      title={`${creature.name}${creature.quantity > 1 ? ` x${creature.quantity}` : ''}`}
    >
      {creature.pronouns ? (
        <Trait label="Pronouns">{creature.pronouns}</Trait>
      ) : null}
      {creature.statBlockUrl ? (
        <Trait label="Stat Block">
          <a href={creature.statBlockUrl} target="_blank">
            {creature.statBlockText}
          </a>
        </Trait>
      ) : null}
      {creature.trigger ? (
        <Trait label="Trigger">{creature.trigger}</Trait>
      ) : null}
      {creature.personality ? (
        <Trait label="Personality">{creature.personality}</Trait>
      ) : null}
      {creature.motivation ? (
        <Trait label="Motivation">{creature.motivation}</Trait>
      ) : null}
      {creature.combatBehavior ? (
        <Trait label="Combat Behavior">{creature.combatBehavior}</Trait>
      ) : null}
    </Collapsible>
  );
};

export default Creature;
