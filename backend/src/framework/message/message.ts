import type { UUID } from 'crypto';

export interface MessageOpts<TData extends object> {
	streamId?: UUID;
	correlationId?: UUID;
	streamVersion?: number;
	data: TData;
}

export interface IMessage {
	context: string;
	ref: string;
	streamId: UUID | undefined;
	correlationId: UUID;
	streamVersion: number | undefined;
	data: object;
}
