import type { AbilityCheck } from '../data/MapData.ts';
import {
	getValidHeadingIndex,
	h,
	type ValidHeadingIndex,
} from '../helpers/headings.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface AbilityCheckProps extends React.PropsWithChildren {
	check: AbilityCheck;
	topLevelHeading: ValidHeadingIndex;
}

const AbilityCheck: React.FC<AbilityCheckProps> = ({
	check,
	topLevelHeading,
}) => {
	const H1 = h[topLevelHeading];
	const H2 = h[getValidHeadingIndex(topLevelHeading + 1)];

	return (
		<Collapsible
			headingElement={H1}
			title={`${check.skills.join('/')} (DC ${check.dc}) on ${check.target}`}
		>
			{check.prerequisites ? (
				<>
					<H2>Prerequisites</H2>
					<ul>
						{check.prerequisites.map((prerequisite, prerequisiteIndex) => (
							<li key={`prerequisite-${prerequisiteIndex}`}>{prerequisite}</li>
						))}
					</ul>
				</>
			) : null}
			{check.success ? <Trait label="Success">{check.success}</Trait> : null}
			{check.failure ? <Trait label="Failure">{check.failure}</Trait> : null}
			{check.notes?.length ? (
				<>
					<H2>Notes</H2>
					<ul>
						{check.notes.map((note, noteIndex) => (
							<li key={`check-note-${noteIndex}`}>{note}</li>
						))}
					</ul>
				</>
			) : null}
		</Collapsible>
	);
};

export default AbilityCheck;
