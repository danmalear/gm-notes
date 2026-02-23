import type { ActionStub } from '#dtos/action.ts';
import { h, ValidHeadingIndex } from '../helpers/headings.ts';
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
						<Trait label="Ability check">{JSON.stringify(check)}</Trait>
					))
				: null}
		</Collapsible>
	);
};

export default Action;
