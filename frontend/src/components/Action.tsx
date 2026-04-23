import AbilityCheck from '#ability-check/AbilityCheck.tsx';
import type { ActionStub } from '#dtos/action.ts';
import {
	getValidHeadingIndex,
	h,
	ValidHeadingIndex,
} from '../helpers/headings.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface ActionProps extends React.PropsWithChildren {
	action: ActionStub;
	topLevelHeading: ValidHeadingIndex;
}

const Action: React.FC<ActionProps> = ({ action, topLevelHeading }) => {
	const H1 = h[topLevelHeading];
	const H2 = h[getValidHeadingIndex(topLevelHeading + 1)];

	return (
		<Collapsible headingElement={H1} title={action.name}>
			{action.type ? <Trait label="Type">{action.type}</Trait> : null}
			{action.conditions.length ? (
				<>
					<H2>Conditions</H2>
					<ul>
						{action.conditions.map((condition, index) => (
							<li key={`action-${action.id}-condition-${condition}-${index}`}>
								{condition}
							</li>
						))}
					</ul>
				</>
			) : null}
			{action.narration ? <p>{action.narration}</p> : null}
			{action.abilityChecks?.length
				? action.abilityChecks.map((check) => (
						<AbilityCheck
							key={`action-${action.id}-check-${check.id}`}
							checkStub={check}
							topLevelHeading={getValidHeadingIndex(topLevelHeading + 1)}
						>
							{JSON.stringify(check)}
						</AbilityCheck>
					))
				: null}
		</Collapsible>
	);
};

export default Action;
