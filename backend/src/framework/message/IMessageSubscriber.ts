import type { ICloneable } from '#shared/ICloneable.ts';
import type { IMessage, MessageType } from './IMessage.ts';

/**
 * Something that expects to listen to a message bus
 *
 * @param TType the type of message (i.e. Command or Event) to listen for
 * @param TMessage the type of message it handles - should be a union type of multiple specific messages
 */
export interface IMessageSubscriber<
	TType extends MessageType,
	TMessage extends IMessage<TType>,
> extends ICloneable<IMessageSubscriber<TType, TMessage>> {
	handle: (message: TMessage) => Promise<void>;
}
