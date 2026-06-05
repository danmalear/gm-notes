import type { IMessage } from './message.ts';

/**
 * Something that expects to listen to a message bus
 */
export interface IMessageSubscriber<TMessage extends IMessage> {
	handle: (message: TMessage) => Promise<void>;
}
