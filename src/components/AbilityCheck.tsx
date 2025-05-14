import type { AbilityCheck } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

export interface AbilityCheckProps extends React.PropsWithChildren {
	check: AbilityCheck;
	headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
	prereqsHeadingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const AbilityCheck: React.FC<AbilityCheckProps> = ({
	check,
	headingElement,
	...props
}) => {
	return (
		<Collapsible
			headingElement={headingElement}
			title={`${check.skills.join('/')} (DC ${check.dc}) on ${check.target}`}
		>
			{check.prerequisites ? (
				<>
					<props.prereqsHeadingElement>
						Prerequisites
					</props.prereqsHeadingElement>
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
					<props.prereqsHeadingElement>Notes</props.prereqsHeadingElement>
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
