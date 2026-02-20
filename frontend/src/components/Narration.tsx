import { NarrationResponse } from '#dtos/Narration.ts';
import React from 'react';
import Collapsible from './Collapsible.tsx';

export interface NarrationProps {
	narration: NarrationResponse;
	headingElement: React.ElementType<React.HTMLProps<HTMLHeadingElement>>;
}

const Narration: React.FC<NarrationProps> = ({ narration, headingElement }) => {
	const sections = narration.description
		.split('\n')
		.filter((section) => !!section.trim())
		.map((section, index) => (
			<p key={`narration-${narration.id}-section-${index}`}>{section.trim()}</p>
		));

	return (
		<Collapsible headingElement={headingElement} title={narration.name}>
			{sections}
		</Collapsible>
	);
};

export default Narration;
