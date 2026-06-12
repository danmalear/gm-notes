import type { HandoutModel } from '#prisma-models/Handout.ts';
import type { UUID } from 'node:crypto';
import type { HandoutStub } from './handout-dtos.ts';

export function toStub(handout: HandoutModel) {
	const handoutStub: HandoutStub = {
		id: handout.HandoutId as UUID,
		campaignId: handout.CampaignId as UUID,
		name: handout.Name,
		type: handout.Type,
		source: handout.Source,
	};

	return handoutStub;
}
