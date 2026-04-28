import type { UUID } from 'crypto';
import type { Message, MessageType } from './Message.ts';

/**
 * Something that expects to listen to a message bus
 *
 * @param TType the type of message (i.e. Command or Event) to listen for
 * @param TMessage the type of message it handles - should be a union type of multiple specific messages
 */
export interface IMessageSubscriber<
	TType extends MessageType,
	TMessage extends Message<TType>,
> {
	handle: (message: TMessage) => Promise<UUID>;
}
