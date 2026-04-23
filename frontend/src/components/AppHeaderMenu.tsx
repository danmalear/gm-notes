import { uploadFile } from '#file/file-service.ts';
import { Button, FileInput, Menu, Modal } from '@mantine/core';
import { IconDotsVertical, IconUpload } from '@tabler/icons-react';
import React, { type FormEvent, useState } from 'react';

const AppHeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [uploadModalOpened, setUploadModalOpened] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const handleUploadClicked = () => {
		setUploadModalOpened(true);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			const data = new FormData(e.currentTarget);
			uploadFile(data)
				.then((res) => {
					alert(`${res.data.fileName} uploaded: ID ${res.data.fileId}`);
					setUploadModalOpened(false);
				})
				.catch((e) => {
					alert(`Error uploading ${file.name}. See console for details.`);
					console.error(`Error uploading ${file.name}. Details: ${e.message}`);
				});
		}
	};

	return (
		<>
			<Modal
				opened={uploadModalOpened}
				onClose={() => setUploadModalOpened(false)}
				title="Upload File"
			>
				<form onSubmit={handleSubmit} encType="multipart/formdata">
					<FileInput
						name="file"
						label="File"
						placeholder="Upload file"
						value={file}
						onChange={setFile}
					/>
					<Button type="submit">Upload</Button>
				</form>
			</Modal>
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
