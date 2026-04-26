import { validateMessage, type Message } from '#message/Message.ts';

export type Event<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> = Message<'Event', TContext, TRef, TData>;

export function validateEvent(obj: unknown): asserts obj is Event {
	validateMessage(obj, 'Event');
}
