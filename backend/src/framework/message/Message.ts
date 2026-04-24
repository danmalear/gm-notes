import { BadRequestError } from '#shared/error.ts';
import type { UUID } from 'crypto';

export interface Message {
	context: string;
	streamId?: UUID;
	type: string;
	data: object;
}

export function validateMessage(
	obj: unknown,
	messageType: string = 'message',
): asserts obj is Message {
	if (!obj) {
		throw new BadRequestError(`No body supplied to ${messageType} request`);
	}
	if (typeof obj !== 'object' || Array.isArray(obj)) {
		throw new BadRequestError(
			`Invalid body supplied to ${messageType} request`,
		);
	}
	if (!('context' in obj) || !obj.context || typeof obj.context !== 'string') {
		throw new BadRequestError(
			`Invalid context supplied to ${messageType} request`,
		);
	}
	if (!('type' in obj) || !obj.type || typeof obj.type !== 'string') {
		throw new BadRequestError(
			`Invalid type supplied to ${messageType} request`,
		);
	}
	if (!('data' in obj) || !obj.data || typeof obj.data !== 'object') {
		throw new BadRequestError(
			`Invalid data supplied to ${messageType} request`,
		);
	}
}
