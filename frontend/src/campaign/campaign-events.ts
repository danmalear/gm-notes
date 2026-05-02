import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';

export interface CampaignCreated {
	id: UUID;
	name: string;
}

export function validateCampaignCreated(
	event: object,
): asserts event is CampaignCreated {
	if (!('id' in event) || !event.id) {
		throw new Error('Missing Campaign ID');
	}
	if (typeof event.id !== 'string' || !isUUID(event.id)) {
		throw new Error(`Invalid Campaign ID: ${event.id}`);
	}
	if (!('name' in event) || !event.name) {
		throw new Error('Missing Campaign name');
	}
	if (typeof event.name !== 'string') {
		throw new Error(`Invalid Campaign name: ${event.name}`);
	}
}
