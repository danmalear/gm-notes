import type { IEventSubscriber } from '#event/event-subscriber.ts';
import type { IEvent } from '#event/event.ts';
import { NotImplementedError } from '#shared/error.ts';
import { validateCampaignCreated } from './campaign-events.ts';
import type { CampaignRec, CampaignRepository } from './campaign-repository.ts';

export class CampaignProjections implements IEventSubscriber {
	campaignRepository: CampaignRepository;

	constructor(campaignRepository: CampaignRepository) {
		this.campaignRepository = campaignRepository;
	}

	async handle(event: IEvent) {
		switch (event.ref) {
			case 'Created':
				await this.Created(event.data);
				break;
			default:
				throw new NotImplementedError(
					`Campaign event ${event.ref} not implemented`,
				);
		}
	}

	async Created(event: object) {
		validateCampaignCreated(event);
		const newCampaign: CampaignRec = {
			CampaignId: event.id,
			CampaignTemplateId: null,
			Name: event.name,
			ActiveMapId: null,
		};

		this.campaignRepository.insert(newCampaign);
	}
}
