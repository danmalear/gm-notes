import type { DataResponse } from '#dtos/DataResponse.ts';
import type { CampaignCreate, CampaignResponse } from '#dtos/campaign.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getAllCampaigns = async () => {
	return await api.get<DataResponse<CampaignResponse[]>>(`/campaigns`);
};

export const getCampaign = async (id: UUID) => {
	return await api.get<DataResponse<CampaignResponse>>(`/campaigns/${id}`);
};

export const insertCampaign = async (data: CampaignCreate) => {
	return await api.post<DataResponse<CampaignResponse>>(`/campaigns`, data);
};
