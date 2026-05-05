import type { EventOpts } from '#event/Event.ts';
import { Event } from '#event/Event.ts';
import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';

// #region CampaignCreated

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

export type CampaignCreatedEventOpts = EventOpts<
	'Campaign',
	'Created',
	CampaignCreated
>;

export class CampaignCreatedEvent extends Event<
	'Campaign',
	'Created',
	CampaignCreated
> {
	constructor({ streamId, data, correlationId }: CampaignCreatedEventOpts) {
		super({
			context: 'Campaign',
			ref: 'Created',
			streamId,
			correlationId,
			streamVersion: 0,
			data,
		});
	}
}

// #endregion CampaignCreated

// #region CampaignRenamed

export interface CampaignRenamed {
	id: UUID;
	name: string;
}

export type CampaignRenamedEventOpts = EventOpts<
	'Campaign',
	'Renamed',
	CampaignRenamed
>;

export class CampaignRenamedEvent extends Event<
	'Campaign',
	'Renamed',
	CampaignRenamed
> {
	constructor({
		streamId,
		correlationId,
		streamVersion,
		data,
	}: CampaignRenamedEventOpts) {
		super({
			context: 'Campaign',
			ref: 'Renamed',
			streamId,
			correlationId,
			streamVersion,
			data,
		});
	}
}

// #endregion CampaignRenamed

export type CampaignEvent = CampaignCreatedEvent | CampaignRenamedEvent;
