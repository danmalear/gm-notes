import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
import type { CampaignRec, CampaignRefRec } from './campaign-repository.ts';

export const toDto = (campaign: CampaignRefRec) => {
	const campaignResponse: CampaignResponse = {
		id: campaign.CampaignId,
		name: campaign.Name,
		activeMapId: campaign.ActiveMapId ?? undefined,
		// @TODO map the maps
		maps: campaign.Maps.map((map) => ({
			id: map.MapId,
			campaignId: map.CampaignId,
			name: map.Name,
			imagePath: map.ImagePath,
		})),
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
