import { NotImplementedError } from '#shared/error.ts';
import { Stream } from '#stream/Stream.ts';
import type { CampaignCreated, CampaignEvent } from './campaign-events.ts';
import type { CampaignRec } from './campaign-repository.ts';

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
