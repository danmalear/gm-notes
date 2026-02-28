import type { HandoutStub } from '#dtos/handout.ts';
import { Center, Modal, Stack } from '@mantine/core';
import { type MouseEvent, useState } from 'react';
import type { Handout as HandoutData } from '../data/MapData.ts';
import { filePath } from '../services/fileService.ts';
import CopyLink from './CopyLink.tsx';

export interface HandoutProps {
	handout: HandoutData | HandoutStub;
}

export const Handout: React.FC<HandoutProps> = ({ handout }) => {
	const [imageModalOpened, setImageModalOpened] = useState(false);
	const [textModalOpened, setTextModalOpened] = useState(false);

	const handleOpenImageModalClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setImageModalOpened(true);
	};

	const handleOpenTextModalClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setTextModalOpened(true);
	};

	return (
		<>
			{'source' in handout ? (
				<>
					<Modal
						opened={imageModalOpened}
						onClose={() => setImageModalOpened(false)}
						title={handout.name}
						size="lg"
					>
						<Center>
							<img
								src={filePath(handout.source)}
								style={{
									maxHeight: 'var(--modal-size)',
									maxWidth: 'var(--modal-size)',
								}}
							/>
						</Center>
					</Modal>
					<Modal
						opened={textModalOpened}
						onClose={() => setTextModalOpened(false)}
						title={handout.name}
					>
						<Stack align="start" gap="sm">
							{handout.source.split('\n').map((line) => (
								<div>{line.trim()}</div>
							))}
						</Stack>
					</Modal>
				</>
			) : null}
			{'name' in handout ? (
				<li>
					{handout.type === 'Text' ? (
						<a href="#" onClick={handleOpenTextModalClick}>
							{handout.name}
						</a>
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
