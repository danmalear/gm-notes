import classNames from 'classnames';
import { useState } from 'react';
import './Collapsible.css';

export interface CollapsibleProps extends React.PropsWithChildren {
  open?: boolean;
  title: string;
  headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  open,
  children,
  title,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  const handleTitleClick = () => {
    setIsOpen((prev) => !prev);
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
