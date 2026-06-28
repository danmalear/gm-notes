import { toStub as mapToStub } from '#map/map-mappers.ts';
import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
import type { CampaignRec, CampaignRefRec } from './campaign-repository.ts';

export const toDto = (campaign: CampaignRefRec) => {
	const campaignResponse: CampaignResponse = {
		id: campaign.CampaignId,
		name: campaign.Name,
		activeMapId: campaign.ActiveMapId ?? undefined,
		maps: campaign.Maps.map(mapToStub),
	};

	return campaignResponse;
};

export const toStub = (campaign: CampaignRec) => {
	const campaignStub: CampaignStub = {
		id: campaign.CampaignId,
		name: campaign.Name,
		activeMapId: campaign.ActiveMapId ?? undefined,
	};

	return campaignStub;
};
