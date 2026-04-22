import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
import type { Campaign, CampaignRaw } from './Campaign.ts';

export const toDto = (campaign: Campaign) => {
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

export const toStub = (campaign: CampaignRaw) => {
	const campaignStub: CampaignStub = {
		id: campaign.CampaignId,
		name: campaign.Name,
		activeMapId: campaign.ActiveMapId ?? undefined,
	};

	return campaignStub;
};
