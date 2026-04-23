import { Popover, Text } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { useState, type MouseEvent } from 'react';

export type CopyLinkProps = React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>;

const CopyLink: React.FC<CopyLinkProps> = (props) => {
	const [popoverOpened, setPopoverOpened] = useState(false);

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (props.href) {
			navigator.clipboard.writeText(props.href);
			setPopoverOpened(true);
			setTimeout(() => {
				setPopoverOpened(false);
			}, 1000);
		}
	};

	return (
		<Popover position="right" opened={popoverOpened}>
			<Popover.Target>
				<a {...props} href="#" onClick={handleClick}>
					{props.children}
					<IconCopy size="1rem" />
				</a>
			</Popover.Target>
			<Popover.Dropdown>
				<Text size="xs">Copied!</Text>
			</Popover.Dropdown>
		</Popover>
	);
};

export default CopyLink;
