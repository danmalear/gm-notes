import { BadRequestError } from '#shared/error.ts';

export interface CommandRequest {
	domain: string;
	commandType: string;
	command: object;
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
	if (!('domain' in obj) || !obj.domain || typeof obj.domain !== 'string') {
		throw new BadRequestError('Invalid domain supplied to command request');
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
