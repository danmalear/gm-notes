import AbilityCheck from '#ability-check/AbilityCheck.tsx';
import Collapsible from '../components/Collapsible.tsx';
import Trait from '../components/Trait.tsx';
import {
	getValidHeadingIndex,
	h,
	ValidHeadingIndex,
} from '../helpers/headings.ts';
import type { ActionStub } from './action-dtos.ts';

export interface ActionProps extends React.PropsWithChildren {
	actionStub: ActionStub;
	topLevelHeading: ValidHeadingIndex;
}

const Action: React.FC<ActionProps> = ({ actionStub, topLevelHeading }) => {
	const H1 = h[topLevelHeading];
	const H2 = h[getValidHeadingIndex(topLevelHeading + 1)];

	return (
		<Collapsible headingElement={H1} title={actionStub.name}>
			{actionStub.type ? <Trait label="Type">{actionStub.type}</Trait> : null}
			{actionStub.conditions.length ? (
				<>
					<H2>Conditions</H2>
					<ul>
						{actionStub.conditions.map((condition, index) => (
							<li
								key={`action-${actionStub.id}-condition-${condition}-${index}`}
							>
								{condition}
							</li>
						))}
					</ul>
				</>
			) : null}
			{actionStub.narration ? <p>{actionStub.narration}</p> : null}
			{actionStub.abilityChecks?.length
				? actionStub.abilityChecks.map((check) => (
						<AbilityCheck
							key={`action-${actionStub.id}-check-${check.id}`}
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
