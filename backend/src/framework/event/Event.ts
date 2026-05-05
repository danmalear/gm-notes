import { type IMessage } from '#message/IMessage.ts';
import type { UUID } from 'crypto';

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
	correlationId: UUID | undefined;
	streamVersion: number;
	data: TData;

	constructor(
		context: TContext,
		ref: TRef,
		streamId: UUID,
		correlationId: UUID | undefined,
		streamVersion: number,
		data: TData,
	) {
		this.type = 'Event';
		this.context = context;
		this.ref = ref;
		this.streamId = streamId;
		this.correlationId = correlationId;
		this.data = data;
		this.streamVersion = streamVersion;
	}
}
