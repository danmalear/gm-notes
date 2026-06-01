import type { IEvent } from '#event/event.ts';
import { NotImplementedError } from '#shared/error.ts';
import type { StreamConfig } from '#stream/Stream.ts';
import { Stream } from '#stream/Stream.ts';
import type { UUID } from 'crypto';
import { validateCampaignCreated } from './campaign-events.ts';
import type { CampaignRec } from './campaign-repository.ts';

export class Campaign extends Stream<CampaignRec> {
	override emptyRecord: CampaignRec;

	constructor(id: UUID, streamConfig: StreamConfig) {
		super(id, streamConfig);
		this.emptyRecord = {
			CampaignId: id,
			CampaignTemplateId: null,
			ActiveMapId: null,
			Name: '',
		};
	}

	override async applyEvent(aggregate: CampaignRec, event: IEvent) {
		switch (event.ref) {
			case 'Created':
				return this.Created(aggregate, event);
			default:
				throw new NotImplementedError(
					`Campaign event ${event.ref} is not implemented.`,
				);
		}
	}

	Created(aggregate: CampaignRec, event: IEvent) {
		validateCampaignCreated(event.data);
		aggregate.CampaignId = event.data.id;
		aggregate.Name = event.data.name;
	}
}
