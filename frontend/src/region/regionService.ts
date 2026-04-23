import type { DataResponse } from '#dtos/DataResponse.ts';
import api from '#shared/api.ts';
import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';
import data from '../legacy/data.ts';
import type { RegionCreate, RegionResponse } from './region-dtos.ts';

// @TODO remove this dependency
const mapDataHC = data.deathHouse;

export const getAllRegions = async () => {
	return await api.get<DataResponse<RegionResponse[]>>(`/regions`);
};

export const getRegionsByMapId = async (mapId: UUID) => {
	return await api.get<DataResponse<RegionResponse[]>>(
		`/regions?mapId=${mapId}`,
	);
};

// @TODO Eventually id should be a UUID
export const getRegion = async (id: string) => {
	if (isUUID(id)) {
		const response = await api.get<DataResponse<RegionResponse>>(
			`/regions/${id}`,
		);

		if (!response?.data?.data) {
			throw Error('Region not found');
		}

		return response.data.data;
	} else {
		return mapDataHC.regions[id];
	}
};

export const createRegion = async (newRegion: RegionCreate) => {
	return await api.post<DataResponse<RegionResponse>>('/regions', newRegion);
};
