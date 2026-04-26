import type { Message } from '#message/Message.ts';
import type { UUID } from 'crypto';

export interface Command<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> extends Message<TContext, TRef, TData> {
	type: 'Command';
	context: TContext;
	streamId: UUID | undefined;
	ref: TRef;
	data: TData;
}
