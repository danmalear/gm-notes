import React from 'react';
import Collapsible from '../components/Collapsible.tsx';
import { h, type ValidHeadingIndex } from '../helpers/headings.ts';
import type { NarrationResponse } from './narration-dtos.ts';

export interface NarrationProps {
	narration: NarrationResponse;
	topLevelHeading: ValidHeadingIndex;
}

const Narration: React.FC<NarrationProps> = ({
	narration,
	topLevelHeading,
}) => {
	const H1 = h[topLevelHeading];

	const sections = narration.description
		.split('\n')
		.filter((section) => !!section.trim())
		.map((section, index) => (
			<p key={`narration-${narration.id}-section-${index}`}>{section.trim()}</p>
		));

	return (
		<Collapsible headingElement={H1} title={narration.name}>
			{sections}
		</Collapsible>
	);
};

export default Narration;
