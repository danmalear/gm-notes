import type { AbilityCheck } from '../data/MapData.ts';
import Collapsible from './Collapsible.tsx';

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
      {check.success ? (
        <p>
          <span className="fw-bold">Success: </span>
          {check.success}
        </p>
      ) : null}
      {check.failure ? (
        <p>
          <span className="fw-bold">Failure: </span>
          {check.failure}
        </p>
      ) : null}
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
