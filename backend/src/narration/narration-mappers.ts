import type { UUID } from 'node:crypto';
import type { NarrationResponse, NarrationStub } from './narration-dtos.ts';
import type { NarrationMin } from './narration-repository.ts';

export function toDto(narration: NarrationMin) {
	const narrationResponse: NarrationResponse = {
		id: narration.NarrationId as UUID,
		name: narration.Name,
		description: narration.Description,
		isRead: narration.IsRead,
	};

	return narrationResponse;
}

export function toStub(narration: NarrationMin) {
	const narrationStub: NarrationStub = {
		id: narration.NarrationId as UUID,
		name: narration.Name,
		isRead: narration.IsRead,
	};

	return narrationStub;
}
