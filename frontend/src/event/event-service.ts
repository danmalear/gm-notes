import api from '#shared/api.ts';
import type { CommandResponse, DataResponse } from '#shared/dtos.ts';
import type { ApplyEvent, ApplyEventCommand } from './event-dtos.ts';

export const applyEvent = async (data: ApplyEvent) => {
	const commandRequest: ApplyEventCommand = {
		context: 'Event',
		ref: 'Apply',
		data: data,
	};
	return await api.post<DataResponse<CommandResponse>>(
		`/commands`,
		commandRequest,
	);
};
