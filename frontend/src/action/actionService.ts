import type { DataResponse } from '#dtos/DataResponse.ts';
import type { UUID } from 'crypto';
import api from '../services/api.ts';
import type { ActionResponse } from './action-dtos.ts';

export const getAction = async (id: UUID) => {
	const response = await api.get<DataResponse<ActionResponse>>(
		`/actions/${id}`,
	);

	return response;
};
