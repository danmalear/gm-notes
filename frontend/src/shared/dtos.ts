import type { UUID } from 'crypto';

/**
 * Valid request body structure for incoming commands.
 */
export interface CommandRequest<
	TContext extends string,
	TRef extends string,
	TData extends object,
> {
	context: TContext;
	ref: TRef;
	streamId?: UUID;
	streamVersion?: number;
	data: TData;
}

export interface DataResponse<T> {
	data: T;
}

export interface MessageResponse {
	message: string;
}

/**
 * Response structure for commands.
 */
export interface CommandResponse {
	correlationId: UUID;
}
