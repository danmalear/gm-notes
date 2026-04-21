import type { DataResponse } from '#dtos/DataResponse.ts';
import type {
	CampaignResponse,
	CreateCampaign,
	CreateCampaignRequest,
} from '#dtos/campaign.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getAllCampaigns = async () => {
	return await api.get<DataResponse<CampaignResponse[]>>(`/campaigns`);
};

export const getCampaign = async (id: UUID) => {
	return await api.get<DataResponse<CampaignResponse>>(`/campaigns/${id}`);
};

export const createCampaign = async (data: CreateCampaign) => {
	const commandRequest: CreateCampaignRequest = {
		domain: 'Campaign',
		commandType: 'Create',
		command: data,
	};
	return await api.post<DataResponse<{ id: UUID }>>(
		`/commands`,
		commandRequest,
	);
};
