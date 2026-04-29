import { Event } from '#event/Event.ts';
import { NotImplementedError } from '#shared/error.ts';
import { Stream } from '#stream/Stream.ts';
import type { UUID } from 'crypto';
import type { CampaignRec } from './campaign-repository.ts';

export interface CampaignCreated {
	id: UUID;
	name: string;
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

export class Campaign extends Stream<CampaignRec, CampaignEvent> {
	override async applyEvent(event: CampaignEvent) {
		switch (event.ref) {
			case 'Created':
				return this.Created(event.data);
			default:
				throw new NotImplementedError(
					`Campaign event ${event.ref} is not implemented.`,
				);
		}
	}

	Created(event: CampaignCreated) {
		this.aggregate.Name = event.name;
		return this.aggregate.CampaignId;
	}
}
