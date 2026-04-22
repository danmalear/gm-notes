import type { NarrationResponse, NarrationStub } from './narration-dtos.ts';
import type { Narration } from './Narration.ts';

export function toDto(narration: Narration) {
	const narrationResponse: NarrationResponse = {
		id: narration.NarrationId,
		name: narration.Name,
		description: narration.Description,
		isRead: narration.IsRead,
	};

	return narrationResponse;
}

export function toStub(narration: Narration) {
	const narrationStub: NarrationStub = {
		id: narration.NarrationId,
		name: narration.Name,
		description: narration.Description,
		isRead: narration.IsRead,
	};

	return narrationStub;
}
