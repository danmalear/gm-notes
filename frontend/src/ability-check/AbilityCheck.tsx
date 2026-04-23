import SkeletonP from '#shared/components/SkeletonP.tsx';
import { getMessage } from '#shared/error.ts';
import {
	getValidHeadingIndex,
	h,
	type ValidHeadingIndex,
} from '#shared/headings.ts';
import { useCallback, useState, type FC, type PropsWithChildren } from 'react';
import Collapsible from '../components/Collapsible.tsx';
import Trait from '../components/Trait.tsx';
import type { AbilityCheck } from '../legacy/MapData.ts';
import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import { getAbilityCheck } from './abilityCheckService.ts';

export interface AbilityCheckProps extends PropsWithChildren {
	checkStub: AbilityCheck | AbilityCheckStub;
	topLevelHeading: ValidHeadingIndex;
}

const AbilityCheck: FC<AbilityCheckProps> = ({
	checkStub,
	topLevelHeading,
}) => {
	const H1 = h[topLevelHeading];
	const H2 = h[getValidHeadingIndex(topLevelHeading + 1)];

	const [abilityCheck, setAbilityCheck] = useState<
		AbilityCheckResponse | undefined
	>(undefined);

	const loadAbilityCheck = useCallback(() => {
		if (isLegacy(checkStub)) return;

		getAbilityCheck(checkStub.id)
			.then((res) => {
				setAbilityCheck(res.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(getMessage(e));
			});
	}, [checkStub]);

	const handleExpanded = () => {
		if (!abilityCheck) {
			loadAbilityCheck();
		}
	};

	const isLegacy = (
		check: AbilityCheck | AbilityCheckStub,
	): check is AbilityCheck => {
		return 'skills' in check;
	};

	return isLegacy(checkStub) ? (
		<Collapsible
			headingElement={H1}
			title={`${checkStub.skills.join('/')} (DC ${checkStub.dc}) on ${checkStub.target}`}
		>
			{checkStub.prerequisites ? (
				<>
					<H2>Prerequisites</H2>
					<ul>
						{checkStub.prerequisites.map((prerequisite, prerequisiteIndex) => (
							<li key={`prerequisite-${prerequisiteIndex}`}>{prerequisite}</li>
						))}
					</ul>
				</>
			) : null}
			{checkStub.success ? (
				<Trait label="Success">{checkStub.success}</Trait>
			) : null}
			{checkStub.failure ? (
				<Trait label="Failure">{checkStub.failure}</Trait>
			) : null}
			{checkStub.notes?.length ? (
				<>
					<H2>Notes</H2>
					<ul>
						{checkStub.notes.map((note, noteIndex) => (
							<li key={`check-note-${noteIndex}`}>{note}</li>
						))}
					</ul>
				</>
			) : null}
		</Collapsible>
	) : (
		<Collapsible
			headingElement={H1}
			title={`${checkStub.skill} (DC ${checkStub.dc})`}
			onExpanded={handleExpanded}
		>
			{abilityCheck ? (
				<>
					{abilityCheck.successNarration ? (
						<Trait label="Success">{abilityCheck.successNarration}</Trait>
					) : null}
					{abilityCheck.criticalSuccessNarration ? (
						<Trait label="Critical Success">
							{abilityCheck.criticalSuccessNarration}
						</Trait>
					) : null}
					{abilityCheck.failureNarration ? (
						<Trait label="Failure">{abilityCheck.failureNarration}</Trait>
					) : null}
					{abilityCheck.criticalFailureNarration ? (
						<Trait label="Critical Failure">
							{abilityCheck.criticalFailureNarration}
						</Trait>
					) : null}
				</>
			) : (
				<SkeletonP />
			)}
		</Collapsible>
	);
};

export default AbilityCheck;
