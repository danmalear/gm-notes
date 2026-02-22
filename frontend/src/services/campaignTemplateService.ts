import type {
	CampaignTemplateCreate,
	CampaignTemplateResponse,
} from '#dtos/campaign-template.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getCampaignTemplate = async (id: UUID) => {
	return await api.get<DataResponse<CampaignTemplateResponse>>(
		`/campaign-templates/${id}`,
	);
};

export const insertCampaignTemplate = async (data: CampaignTemplateCreate) => {
	return await api.post<DataResponse<CampaignTemplateResponse>>(
		`/campaign-templates`,
		data,
	);
};
