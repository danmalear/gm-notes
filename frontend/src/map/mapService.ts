import type { DataResponse } from '#dtos/DataResponse.ts';
import api from '#shared/api.ts';
import type { UUID } from 'crypto';
import type { MapCreate, MapResponse, MapUpdate } from './map-dtos.ts';

export const getAllMaps = async () => {
	return await api.get<DataResponse<MapResponse[]>>(`/maps`);
};

export const getMapsByCampaignId = async (campaignId: UUID) => {
	return await api.get<DataResponse<MapResponse[]>>(
		`/maps?campaignId=${campaignId}`,
	);
};

export const getMap = async (id: UUID) => {
	return await api.get<DataResponse<MapResponse>>(`/maps/${id}`);
};

export const insertMap = async (data: MapCreate) => {
	return await api.post<DataResponse<MapResponse>>(`/maps`, data);
};

export const updateMap = async (data: MapUpdate) => {
	return await api.put<DataResponse<MapResponse>>(`/maps`, data);
};
