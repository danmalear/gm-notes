import type { DataResponse } from '#dtos/DataResponse.ts';
import api from '#shared/api.ts';
import type { UUID } from 'crypto';
import type { NarrationResponse, NarrationStub } from './narration-dtos.ts';

export const getNarrationsByRegionId = async (regionId: UUID) => {
	return await api.get<DataResponse<NarrationStub[]>>(
		`/narrations?regionId=${regionId}`,
	);
};

export const getNarration = async (id: UUID) => {
	return await api.get<DataResponse<NarrationResponse>>(`/narrations/${id}`);
};
