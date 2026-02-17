import type { DataResponse } from '#dtos/DataResponse.ts';
import type { RegionResponse } from '#dtos/Region.ts';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getAllRegions = async () => {
	return await api.get<DataResponse<RegionResponse[]>>(`/regions`);
};

export const getRegionsByMapId = async (mapId: UUID) => {
	return await api.get<DataResponse<RegionResponse[]>>(
		`/regions?mapId=${mapId}`,
	);
};

export const getRegion = async (id: UUID) => {
	return await api.get<DataResponse<RegionResponse>>(`/regions/${id}`);
};
