import type { IMessage, MessageOpts } from '#message/IMessage.ts';

export type CommandOpts<TData extends object> = MessageOpts<TData>;

export type ICommand = IMessage;
