import { BadRequestError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';

/**
 * Valid request body structure for incoming commands.
 */
export type CommandRequest = {
	context: string;
	ref: string;
	streamId: UUID | undefined;
	streamVersion: number | undefined;
	data: object;
};

/**
 * Response structure for commands.
 */
export interface CommandResponse {
	id: UUID;
}

export function validateCommandRequest(
	obj: unknown,
): asserts obj is CommandRequest {
	if (!obj) {
		throw new BadRequestError(`No body supplied to Command request`);
	}
	if (typeof obj !== 'object' || Array.isArray(obj)) {
		throw new BadRequestError(`Invalid body supplied to Command request`);
	}
	if (!('context' in obj) || !obj.context || typeof obj.context !== 'string') {
		throw new BadRequestError(`Invalid context supplied to Command request`);
	}
	if (!('ref' in obj) || !obj.ref || typeof obj.ref !== 'string') {
		throw new BadRequestError(`Invalid ref supplied to Command request`);
	}
	if (
		'streamId' in obj &&
		typeof obj.streamId !== 'undefined' &&
		(typeof obj.streamId !== 'string' || !isUUID(obj.streamId))
	) {
		throw new BadRequestError(`Invalid stream ID supplied to Command request`);
	}
	if (
		'streamVersion' in obj &&
		typeof obj.streamVersion !== 'undefined' &&
		(typeof obj.streamVersion !== 'number' || obj.streamVersion < 0)
	) {
		throw new BadRequestError(
			`Invalid stream version supplied to Command request`,
		);
	}
	if (!('data' in obj) || !obj.data || typeof obj.data !== 'object') {
		throw new BadRequestError(`Invalid data supplied to Command request`);
	}
}
