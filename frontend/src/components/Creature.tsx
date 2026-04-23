import type { Creature, ValidPartySize } from '../legacy/MapData.ts';
import Collapsible from './Collapsible.tsx';
import CopyLink from './CopyLink.tsx';
import Trait from './Trait.tsx';

export interface CreatureProps extends React.PropsWithChildren {
	creature: Creature;
	partySize?: ValidPartySize;
	headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
	rolesHeadingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Creature: React.FC<CreatureProps> = ({
	creature,
	partySize = 5,
	headingElement,
	...props
}) => {
	const quantity = !creature.quantity
		? 1
		: typeof creature.quantity === 'number'
			? creature.quantity
			: (creature.quantity[partySize] ?? 1);

	const statBlock =
		'text' in creature.statBlock
			? creature.statBlock
			: (creature.statBlock[partySize] ?? creature.statBlock[5]);

	return (
		<Collapsible
			headingElement={headingElement}
			title={`${creature.name}${quantity > 1 ? ` x${quantity}` : ''}`}
		>
			{creature.pronouns ? (
				<Trait label="Pronouns">{creature.pronouns}</Trait>
			) : null}
			{statBlock.url ? (
				<Trait label="Stat Block">
					<CopyLink href={statBlock.url}>{statBlock.text}</CopyLink>
				</Trait>
			) : (
				<Trait label="Stat Block">{statBlock.text}</Trait>
			)}
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
			{creature.roles?.length ? (
				<>
					<props.rolesHeadingElement> Roles</props.rolesHeadingElement>
					<ul>
						{creature.roles.map((role, roleIndex) => (
							<li key={`role-${roleIndex}`}>{role}</li>
						))}
					</ul>
				</>
			) : null}
		</Collapsible>
	);
};

export default Creature;
