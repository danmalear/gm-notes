import type { DataResponse } from '#dtos/DataResponse.ts';
import type { RegionResponse } from '#dtos/region.ts';
import type { UUID } from 'crypto';
import data from '../data/data.ts';
import { isUUID } from '../helpers/uuid.ts';
import api from './api.ts';

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
