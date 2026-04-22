import classNames from 'classnames';
import { useContext, useState } from 'react';
import {
	CollapsiblesContext,
	CollapsiblesDispatchContext,
} from '../contexts/CollapsiblesContext.ts';
import './Collapsible.css';

export interface CollapsibleProps extends React.PropsWithChildren {
	title: string;
	headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
	onToggled?: (isOpen: boolean) => void;
	onExpanded?: () => void;
	onCollapsed?: () => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({
	children,
	title,
	onToggled,
	onExpanded,
	onCollapsed,
	...props
}) => {
	const [stateId] = useState(crypto.randomUUID());

	const collapsibles = useContext(CollapsiblesContext);
	const dispatch = useContext(CollapsiblesDispatchContext);

	const handleToggleOpen = (isOpen: boolean) => {
		dispatch({
			type: 'openToggled',
			collapsibleId: stateId,
			isOpen,
		});

		if (onToggled) {
			onToggled(isOpen);
		}

		if (isOpen) {
			if (onExpanded) {
				onExpanded();
			}
		} else {
			if (onCollapsed) {
				onCollapsed();
			}
		}
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
