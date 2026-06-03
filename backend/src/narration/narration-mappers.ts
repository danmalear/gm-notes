import type { NarrationModel } from '#prisma-models/Narration.ts';
import type { UUID } from 'node:crypto';
import type { NarrationResponse, NarrationStub } from './narration-dtos.ts';

export function toDto(narration: NarrationModel) {
	const narrationResponse: NarrationResponse = {
		id: narration.NarrationId as UUID,
		name: narration.Name,
		description: narration.Description,
		isRead: narration.IsRead,
	};

	return narrationResponse;
}

export function toStub(narration: NarrationModel) {
	const narrationStub: NarrationStub = {
		id: narration.NarrationId as UUID,
		name: narration.Name,
		isRead: narration.IsRead,
	};

	return narrationStub;
}
