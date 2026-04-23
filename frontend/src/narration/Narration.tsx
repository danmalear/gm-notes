import { getMessage } from '#shared/error.ts';
import { h, type ValidHeadingIndex } from '#shared/headings.ts';
import { useCallback, useState, type FC } from 'react';
import Collapsible from '../components/Collapsible.tsx';
import SkeletonP from '../shared/components/SkeletonP.tsx';
import type { NarrationResponse, NarrationStub } from './narration-dtos.ts';
import { getNarration } from './narrationService.ts';

export interface NarrationProps {
	narrationStub: NarrationStub;
	topLevelHeading: ValidHeadingIndex;
}

const Narration: FC<NarrationProps> = ({ narrationStub, topLevelHeading }) => {
	const H1 = h[topLevelHeading];

	const [narration, setNarration] = useState<NarrationResponse | undefined>(
		undefined,
	);

	const loadNarration = useCallback(() => {
		getNarration(narrationStub.id)
			.then((res) => {
				setNarration(res.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(getMessage(e));
			});
	}, [narrationStub.id]);

	const handleExpanded = () => {
		if (!narration) {
			loadNarration();
		}
	};

	const sections = narration?.description
		.split('\n')
		.filter((section) => !!section.trim())
		.map((section, index) => (
			<p key={`narration-${narrationStub.id}-section-${index}`}>
				{section.trim()}
			</p>
		));

	return (
		<Collapsible
			headingElement={H1}
			title={narrationStub.name}
			onExpanded={handleExpanded}
		>
			{sections ?? <SkeletonP />}
		</Collapsible>
	);
};

export default Narration;
