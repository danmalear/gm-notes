import { validateMessage, type IMessage } from '#message/IMessage.ts';

export type Event<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> = IMessage<'Event', TContext, TRef, TData>;

export function validateEvent(obj: unknown): asserts obj is Event {
	validateMessage(obj, 'Event');
}
