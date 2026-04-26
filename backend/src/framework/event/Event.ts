import type { Message } from '#message/Message.ts';
import type { UUID } from 'crypto';

export interface Event<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> extends Message<TContext, TRef, TData> {
	type: 'Event';
	context: TContext;
	streamId: UUID | undefined;
	ref: TRef;
	data: TData;
}
