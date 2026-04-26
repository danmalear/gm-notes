import type { NarrationResponse, NarrationStub } from './narration-dtos.ts';
import type { NarrationRec } from './narration-repository.ts';

export function toDto(narration: NarrationRec) {
	const narrationResponse: NarrationResponse = {
		id: narration.NarrationId,
		name: narration.Name,
		description: narration.Description,
		isRead: narration.IsRead,
	};

	return narrationResponse;
}

export function toStub(narration: NarrationRec) {
	const narrationStub: NarrationStub = {
		id: narration.NarrationId,
		name: narration.Name,
		isRead: narration.IsRead,
	};

	return narrationStub;
}
