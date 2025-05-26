import type { CampaignCreate, CampaignResponse } from '#dtos/Campaign.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getAllCampaigns = async () => {
	const response =
		await api.get<DataResponse<CampaignResponse[]>>(`/campaigns`);

	return response.data.data;
};

export const getCampaign = async (id: UUID) => {
	const response = await api.get<DataResponse<CampaignResponse>>(
		`/campaigns/${id}`,
	);

	return response.data.data;
};

export const insertCampaign = async (data: CampaignCreate) => {
	const response = await api.post<DataResponse<CampaignResponse>>(
		`/campaigns`,
		data,
	);

	return response.data.data;
};
