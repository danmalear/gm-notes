import { BadRequestError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';

export interface Message<
	TContext extends string = string,
	TType extends string = string,
	TData extends object = object,
> {
	context: TContext;
	streamId: UUID | undefined;
	type: TType;
	data: TData;
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
	if (!('streamId' in obj)) {
		throw new BadRequestError(
			`No stream ID supplied to ${messageType} request`,
		);
	}
	if (
		typeof obj.streamId !== 'undefined' &&
		(typeof obj.streamId !== 'string' || !isUUID(obj.streamId))
	) {
		throw new BadRequestError(
			`Invalid stream ID supplied to ${messageType} request`,
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
