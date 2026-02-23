import type { ActionStub } from '#dtos/action.ts';
import {
	getValidHeadingIndex,
	h,
	ValidHeadingIndex,
} from '../helpers/headings.ts';
import AbilityCheck from './AbilityCheck.tsx';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface ActionProps extends React.PropsWithChildren {
	action: ActionStub;
	topLevelHeading: ValidHeadingIndex;
}

const Action: React.FC<ActionProps> = ({ action, topLevelHeading }) => {
	const H1 = h[topLevelHeading];

	return (
		<Collapsible headingElement={H1} title={action.name}>
			{action.type ? <Trait label="Type">{action.type}</Trait> : null}
			{action.narration ? <p>{action.narration}</p> : null}
			{action.abilityChecks?.length
				? action.abilityChecks.map((check) => (
						<AbilityCheck
							key={`action-${action.id}-check-${check.id}`}
							check={check}
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
