import type { UUID } from 'crypto';

export interface CommandRequest<
	TContext extends string,
	TRef extends string,
	TData extends object,
> {
	context: TContext;
	ref: TRef;
	streamId: UUID | undefined;
	data: TData;
}

export interface DataResponse<T> {
	data: T;
}

export interface MessageResponse {
	message: string;
}

export interface CommandResponse {
	id: UUID;
}
