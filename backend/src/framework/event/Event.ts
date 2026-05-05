import { type IMessage } from '#message/IMessage.ts';
import { randomUUID, type UUID } from 'crypto';

interface BaseEventOpts<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> {
	context: TContext;
	ref: TRef;
	streamId: UUID;
	correlationId?: UUID;
	streamVersion: number;
	data: TData;
}

export type EventOpts<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> = Omit<Omit<BaseEventOpts<TContext, TRef, TData>, 'context'>, 'ref'>;

export class Event<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> implements IMessage<'Event'>
{
	type: 'Event';
	context: TContext;
	ref: TRef;
	streamId: UUID;
	correlationId: UUID;
	streamVersion: number;
	data: TData;

	constructor({
		context,
		ref,
		streamId,
		correlationId,
		streamVersion,
		data,
	}: BaseEventOpts<TContext, TRef, TData>) {
		this.type = 'Event';
		this.context = context;
		this.ref = ref;
		this.streamId = streamId;
		this.correlationId = correlationId ?? randomUUID();
		this.data = data;
		this.streamVersion = streamVersion;
	}
}
