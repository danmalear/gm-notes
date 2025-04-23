import classNames from 'classnames';
import React, { type PropsWithChildren, useState } from 'react';
import './Collapsible.css';

export interface CollapsibleProps extends PropsWithChildren {
  open?: boolean;
  title: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({ open, children, title }) => {
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
        <h2
          className={classNames({
            'color-inactive': !isOpen,
          })}
        >
          {title}
        </h2>
      </button>
      {isOpen ? <div className="ml-1">{children}</div> : null}
    </>
  );
};

export default Collapsible;
