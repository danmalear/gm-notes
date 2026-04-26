import type { HandoutStub } from './handout-dtos.ts';
import type { HandoutRec } from './handout-repository.ts';

export function toStub(handout: HandoutRec) {
	const handoutStub: HandoutStub = {
		id: handout.HandoutId,
		campaignId: handout.CampaignId,
		name: handout.Name,
		type: handout.Type,
		source: handout.Source,
	};

	return handoutStub;
}
