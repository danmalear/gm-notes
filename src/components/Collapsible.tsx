import classNames from 'classnames';
import './Collapsible.css';

export interface CollapsibleProps extends React.PropsWithChildren {
  isOpen?: boolean;
  title: string;
  onToggleOpen: (isOpen: boolean) => void;
  headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  isOpen,
  children,
  title,
  onToggleOpen,
  ...props
}) => {
  const handleTitleClick = () => {
    onToggleOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className="heading color-text"
        onClick={handleTitleClick}
      >
        <props.headingElement
          className={classNames({
            'color-inactive': !isOpen,
          })}
        >
          {title}
        </props.headingElement>
      </button>
      {isOpen ? <div className="text ml-1">{children}</div> : null}
    </>
  );
};

export default Collapsible;
