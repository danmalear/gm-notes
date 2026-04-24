import type { HandoutStub } from './handout-dtos.ts';
import type { Handout } from './Handout.ts';

export function toStub(handout: Handout) {
	const handoutStub: HandoutStub = {
		id: handout.HandoutId,
		campaignId: handout.CampaignId,
		name: handout.Name,
		type: handout.Type,
		source: handout.Source,
	};

	return handoutStub;
}
