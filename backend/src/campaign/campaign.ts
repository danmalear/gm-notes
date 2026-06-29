import type { IEvent } from '#event/event.ts';
import type { StreamConfig } from '#framework/stream/stream.ts';
import { Stream } from '#framework/stream/stream.ts';
import type { CampaignModel } from '#prisma-models/Campaign.ts';
import { NotImplementedError } from '#shared/error.ts';
import type { UUID } from 'crypto';
import { validateCampaignCreated } from './campaign-events.ts';

export class Campaign extends Stream<CampaignModel> {
	override emptyRecord: CampaignModel;

	constructor(id: UUID, streamConfig: StreamConfig) {
		super(id, streamConfig);
		this.emptyRecord = {
			CampaignId: id,
			CampaignTemplateId: null,
			ActiveMapId: null,
			Name: '',
		};
	}

	override async applyEvent(aggregate: CampaignModel, event: IEvent) {
		switch (event.ref) {
			case 'Created':
				return this.Created(aggregate, event);
			default:
				throw new NotImplementedError(
					`Campaign event ${event.ref} is not implemented.`,
				);
		}
	}

	Created(aggregate: CampaignModel, event: IEvent) {
		validateCampaignCreated(event.data);
		aggregate.CampaignId = event.data.id;
		aggregate.Name = event.data.name;
	}
}
