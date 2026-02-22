import type { DataResponse } from '#dtos/DataResponse.ts';
import type { NarrationResponse } from 'backend/src/dtos/narration.js';
import type { UUID } from 'crypto';
import api from './api.ts';

export const getNarrationsByRegionId = async (regionId: UUID) => {
	return await api.get<DataResponse<NarrationResponse[]>>(
		`/narrations?regionId=${regionId}`,
	);
};

export const getNarration = async (id: UUID) => {
	return await api.get<DataResponse<NarrationResponse>>(`/narrations/${id}`);
};
