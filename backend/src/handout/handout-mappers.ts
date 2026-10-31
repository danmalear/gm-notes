import type { UUID } from 'node:crypto';
import type { HandoutStub } from './handout-dtos.ts';
import type { HandoutMin } from './handout-repository.ts';

export function toStub(handout: HandoutMin) {
	const handoutStub: HandoutStub = {
		id: handout.HandoutId as UUID,
		campaignId: handout.CampaignId as UUID,
		name: handout.Name,
		type: handout.Type,
		source: handout.Source,
	};

	return handoutStub;
}
