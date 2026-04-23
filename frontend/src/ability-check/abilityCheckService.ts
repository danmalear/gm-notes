import type { DataResponse } from '#dtos/DataResponse.ts';
import type { UUID } from 'crypto';
import api from '../services/api.ts';
import type { AbilityCheckResponse } from './ability-check-dtos.ts';

export const getAbilityCheck = async (id: UUID) => {
	const response = await api.get<DataResponse<AbilityCheckResponse>>(
		`/ability-checks/${id}`,
	);

	return response;
};
