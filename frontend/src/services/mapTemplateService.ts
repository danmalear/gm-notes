import type { DataResponse } from '#dtos/DataResponse.ts';
import type {
	MapTemplateCreate,
	MapTemplateResponse,
} from '#dtos/MapTemplate.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getAllMapTemplates = async () => {
	return await api.get<DataResponse<MapTemplateResponse[]>>(`/map-templates`);
};

export const getMapTemplatesByCampaignTemplateId = async (
	campaignTemplateId: UUID,
) => {
	return await api.get<DataResponse<MapTemplateResponse[]>>(
		`/map-templates?campaignTemplateId=${campaignTemplateId}`,
	);
};

export const getMapTemplate = async (id: UUID) => {
	return await api.get<DataResponse<MapTemplateResponse>>(
		`/map-templates/${id}`,
	);
};

export const insertMapTemplate = async (data: MapTemplateCreate) => {
	return await api.post<DataResponse<MapTemplateResponse>>(
		`/map-templates`,
		data,
	);
};
