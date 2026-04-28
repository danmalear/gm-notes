import { validateMessage, type IMessage } from '#message/Message.ts';

export type Command<
	TContext extends string = string,
	TRef extends string = string,
	TData extends object = object,
> = IMessage<'Command', TContext, TRef, TData>;

export function validateCommand(obj: unknown): asserts obj is Command {
	validateMessage(obj, 'Command');
}
