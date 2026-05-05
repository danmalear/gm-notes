import { Event } from '#event/Event.ts';
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

export class CampaignCreatedEvent extends Event<
	'Campaign',
	'Created',
	CampaignCreated
> {
	constructor(campaignId: UUID, data: CampaignCreated) {
		super('Campaign', 'Created', campaignId, 0, data);
	}
}

export interface CampaignRenamed {
	id: UUID;
	name: string;
}

export class CampaignRenamedEvent extends Event<
	'Campaign',
	'Renamed',
	CampaignRenamed
> {
	constructor(campaignId: UUID, streamVersion: number, data: CampaignRenamed) {
		super('Campaign', 'Renamed', campaignId, streamVersion, data);
	}
}

export type CampaignEvent = CampaignCreatedEvent | CampaignRenamedEvent;
