import AbilityCheck from '#ability-check/AbilityCheck.tsx';
import Collapsible from '#shared/collapsible/Collapsible.tsx';
import { getMessage } from '#shared/error.ts';
import {
	getValidHeadingIndex,
	h,
	type ValidHeadingIndex,
} from '#shared/headings.ts';
import SkeletonP from '#shared/skeleton/SkeletonP.tsx';
import { useCallback, useState, type FC, type PropsWithChildren } from 'react';
import Trait from '../components/Trait.tsx';
import type { ActionResponse, ActionStub } from './action-dtos.ts';
import { getAction } from './actionService.ts';

export interface ActionProps extends PropsWithChildren {
	actionStub: ActionStub;
	topLevelHeading: ValidHeadingIndex;
}

const Action: FC<ActionProps> = ({ actionStub, topLevelHeading }) => {
	const H1 = h[topLevelHeading];
	const H2 = h[getValidHeadingIndex(topLevelHeading + 1)];

	const [action, setAction] = useState<ActionResponse | undefined>(undefined);

	const loadAction = useCallback(() => {
		getAction(actionStub.id)
			.then((res) => {
				setAction(res.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(getMessage(e));
			});
	}, [actionStub.id]);

	const handleExpanded = () => {
		if (!action) {
			loadAction();
		}
	};

	return (
		<Collapsible
			headingElement={H1}
			title={actionStub.name}
			onExpanded={handleExpanded}
		>
			{action ? (
				<>
					{action.type ? <Trait label="Type">{action.type}</Trait> : null}
					{action.conditions.length ? (
						<>
							<H2>Conditions</H2>
							<ul>
								{action.conditions.map((condition, index) => (
									<li
										key={`action-${action.id}-condition-${condition}-${index}`}
									>
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
				</>
			) : (
				<SkeletonP />
			)}
		</Collapsible>
	);
};

export default Action;
