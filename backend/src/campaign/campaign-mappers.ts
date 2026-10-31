import { toStub as mapToStub } from '#map/map-mappers.ts';
import type { UUID } from 'node:crypto';
import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
import type { CampaignFull, CampaignMin } from './campaign-repository.ts';

export const toDto = (campaign: CampaignFull) => {
	const campaignResponse: CampaignResponse = {
		id: campaign.CampaignId as UUID,
		name: campaign.Name,
		activeMapId: (campaign.ActiveMapId as UUID) ?? undefined,
		maps: campaign.Maps.map(mapToStub),
	};

	return campaignResponse;
};

export const toStub = (campaign: CampaignMin) => {
	const campaignStub: CampaignStub = {
		id: campaign.CampaignId as UUID,
		name: campaign.Name,
		activeMapId: (campaign.ActiveMapId as UUID) ?? undefined,
	};

	return campaignStub;
};
