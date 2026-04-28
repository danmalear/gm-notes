import { type IMessage } from '#message/IMessage.ts';
import type { UUID } from 'crypto';

export class Command<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> implements IMessage<'Command'>
{
	type: 'Command';
	context: TContext;
	ref: TRef;
	streamId: UUID | undefined;
	data: TData;

	constructor(
		context: TContext,
		ref: TRef,
		streamId: UUID | undefined,
		data: TData,
	) {
		this.type = 'Command';
		this.context = context;
		this.ref = ref;
		this.streamId = streamId;
		this.data = data;
	}
}
