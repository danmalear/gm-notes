import React, { type PropsWithChildren, useState } from 'react';
import './Collapsible.css';

export interface CollapsibleProps extends PropsWithChildren {
  open?: boolean;
  title: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleTitleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button type="button" className="heading" onClick={handleTitleClick}>
        <h2>{title}</h2>
      </button>
      {isOpen ? <div className="p-3">{children}</div> : null}
    </>
  );
};

export default Collapsible;
