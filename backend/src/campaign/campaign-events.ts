import type { EventOpts, IEvent } from '#event/event.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';

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

export class CampaignCreatedEvent implements IEvent {
	context: string;
	ref: string;
	streamId: UUID;
	correlationId: UUID;
	streamVersion: number;
	data: CampaignCreated;

	constructor({
		streamId,
		correlationId,
		data,
	}: Omit<EventOpts<CampaignCreated>, 'streamVersion'>) {
		this.context = 'Campaign';
		this.ref = 'Created';
		this.streamId = streamId;
		this.correlationId = correlationId ?? randomUUID();
		this.streamVersion = 1;
		this.data = data;
	}
}

// #endregion CampaignCreated

// #region CampaignRenamed

export interface CampaignRenamed {
	id: UUID;
	name: string;
}

export class CampaignRenamedEvent implements IEvent {
	context: string;
	ref: string;
	streamId: UUID;
	correlationId: UUID;
	streamVersion: number;
	data: CampaignRenamed;

	constructor({
		streamId,
		correlationId,
		streamVersion,
		data,
	}: EventOpts<CampaignRenamed>) {
		this.context = 'Campaign';
		this.ref = 'Renamed';
		this.streamId = streamId;
		this.correlationId = correlationId ?? randomUUID();
		this.streamVersion = streamVersion;
		this.data = data;
	}
}

// #endregion CampaignRenamed
