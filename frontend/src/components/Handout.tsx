import type { HandoutStub } from '#dtos/handout.ts';
import { Center, Modal } from '@mantine/core';
import { type MouseEvent, useState } from 'react';
import type { Handout as HandoutData } from '../data/MapData.ts';
import { filePath } from '../services/fileService.ts';
import CopyLink from './CopyLink.tsx';

export interface HandoutProps {
	handout: HandoutData | HandoutStub;
}

export const Handout: React.FC<HandoutProps> = ({ handout }) => {
	const [imageModalOpened, setImageModalOpened] = useState(false);

	const handleOpenImageModalClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setImageModalOpened(true);
	};

	return (
		<>
			{'source' in handout ? (
				<Modal
					opened={imageModalOpened}
					onClose={() => setImageModalOpened(false)}
					title={handout.name}
				>
					<Center>
						<img
							src={filePath(handout.source)}
							style={{
								maxHeight: 500,
								maxWidth: 500,
							}}
						/>
					</Center>
				</Modal>
			) : null}
			{'name' in handout ? (
				<li>
					{handout.type === 'Text' ? (
						handout.source
					) : handout.type === 'Image' ? (
						<a href="#" onClick={handleOpenImageModalClick}>
							{handout.name}
						</a>
					) : handout.type === 'File' ? (
						<a href={filePath(handout.source)}>{handout.name}</a>
					) : null}
				</li>
			) : (
				<li>
					{handout.url ? (
						<CopyLink href={handout.url}>{handout.text}</CopyLink>
					) : (
						handout.text
					)}
				</li>
			)}
		</>
	);
};
