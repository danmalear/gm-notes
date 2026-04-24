import api from '#shared/api.ts';
import type { DataResponse } from '#shared/dtos.ts';
import type { UUID } from 'crypto';
import type { LocationItemResponse } from './item-dtos.ts';

export const getLocationItem = async (id: UUID) => {
	const response = await api.get<DataResponse<LocationItemResponse>>(
		`/items/location/${id}`,
	);

	return response;
};
