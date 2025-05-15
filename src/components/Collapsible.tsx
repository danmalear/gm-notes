import classNames from 'classnames';
import { randomUUID } from 'crypto';
import { useContext, useState } from 'react';
import './Collapsible.css';
import {
	RegionDetailsContext,
	RegionDetailsDispatchContext,
} from './RegionDetailsContext';

export interface CollapsibleProps extends React.PropsWithChildren {
	title: string;
	headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Collapsible: React.FC<CollapsibleProps> = ({
	children,
	title,
	...props
}) => {
	const [stateId] = useState(randomUUID());

	const collapsibles = useContext(RegionDetailsContext);
	const dispatch = useContext(RegionDetailsDispatchContext);

	const handleToggleOpen = (isOpen: boolean) => {
		dispatch({
			type: 'openToggled',
			collapsibleId: stateId,
			isOpen,
		});
	};

	const isOpen = () => {
		return collapsibles.openCollapsibles[stateId] ?? false;
	};

	const handleTitleClick = () => {
		handleToggleOpen(!isOpen());
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
						'color-inactive': !isOpen(),
					})}
				>
					{title}
				</props.headingElement>
			</button>
			{isOpen() ? <div className="text ml-1">{children}</div> : null}
		</>
	);
};

export default Collapsible;
