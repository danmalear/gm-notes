import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MapCreate, MapResponse, MapUpdate } from '#dtos/Map.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

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
