import type { HandoutStub } from '#dtos/handout.ts';
import type { Handout as HandoutData } from '../data/MapData.ts';
import { filePath } from '../services/fileService.ts';
import CopyLink from './CopyLink.tsx';

export interface HandoutProps {
	handout: HandoutData | HandoutStub;
}

export const Handout: React.FC<HandoutProps> = ({ handout }) => {
	return 'name' in handout ? (
		<li>
			{handout.type === 'Text' ? (
				handout.source
			) : handout.type === 'Image' ? (
				<img src={filePath(handout.source)} />
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
	);
};
