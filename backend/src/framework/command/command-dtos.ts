import { BadRequestError } from '#shared/error.ts';
import type { UUID } from 'crypto';

export interface CommandRequest {
	context: string;
	commandType: string;
	commandData: object;
}

export function validateCommandRequest(
	obj: unknown,
): asserts obj is CommandRequest {
	if (!obj) {
		throw new BadRequestError(`No body supplied to command request`);
	}
	if (typeof obj !== 'object' || Array.isArray(obj)) {
		throw new BadRequestError('Invalid body supplied to command request');
	}
	if (!('context' in obj) || !obj.context || typeof obj.context !== 'string') {
		throw new BadRequestError('Invalid context supplied to command request');
	}
	if (
		!('commandType' in obj) ||
		!obj.commandType ||
		typeof obj.commandType !== 'string'
	) {
		throw new BadRequestError(
			'Invalid commandType supplied to command request',
		);
	}
	if (!('command' in obj) || !obj.command || typeof obj.command !== 'object') {
		throw new BadRequestError('Invalid command supplied to command request');
	}
}

export interface CommandResponse {
	id: UUID;
}
