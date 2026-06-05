import type { IMessage, MessageOpts } from '#message/message.ts';
import { type UUID } from 'crypto';

export interface EventOpts<TData extends object> extends MessageOpts<TData> {
	streamId: UUID;
	correlationId?: UUID;
	streamVersion: number;
	data: TData;
}

export interface IEvent extends IMessage {
	streamId: UUID;
	streamVersion: number;
}
