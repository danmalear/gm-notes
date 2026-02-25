import { Menu } from '@mantine/core';
import { IconDotsVertical, IconUpload } from '@tabler/icons-react';

const AppHeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
	const handleUploadClicked = () => {
		alert('Upload clicked - not implemented');
	};

	return (
		<Menu>
			<Menu.Target>
				<IconDotsVertical cursor="pointer" />
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Development</Menu.Label>
				<Menu.Item
					leftSection={<IconUpload size={14} />}
					onClick={handleUploadClicked}
				>
					Upload File
				</Menu.Item>
				{children}
			</Menu.Dropdown>
		</Menu>
	);
};

export default AppHeaderMenu;
