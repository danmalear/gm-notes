import { Menu, Modal } from '@mantine/core';
import { IconDotsVertical, IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

const AppHeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [modalOpened, setModalOpened] = useState(false);

	const handleUploadClicked = () => {
		setModalOpened(true);
	};

	return (
		<>
			<Modal opened={modalOpened} onClose={() => setModalOpened(false)} />
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
		</>
	);
};

export default AppHeaderMenu;
