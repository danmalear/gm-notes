import type {
	CampaignTemplateCreate,
	CampaignTemplateResponse,
} from '#dtos/CampaignTemplate.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getCampaignTemplate = async (id: UUID) => {
	const response = await api.get<DataResponse<CampaignTemplateResponse>>(
		`/campaign-templates/${id}`,
	);

	return response.data.data;
};

export const insertCampaignTemplate = async (data: CampaignTemplateCreate) => {
	const response = await api.post<DataResponse<CampaignTemplateResponse>>(
		`/campaign-templates`,
		data,
	);

	return response.data.data;
};
