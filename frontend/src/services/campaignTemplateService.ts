import type { CampaignTemplate } from '#dtos/models/CampaignTemplate.ts';
import type { DataResponse } from '#dtos/responses/DataResponse.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getCampaignTemplate = async (id: UUID) => {
	const response = await api.get<DataResponse<CampaignTemplate>>(
		`/campaign-template/${id}`,
	);

	return response.data.data;
};

export const insertCampaignTemplate = async (data: CampaignTemplate) => {
	const response = await api.post<DataResponse<CampaignTemplate>>(
		`/campaign-template`,
		data,
	);

	return response.data.data;
};
