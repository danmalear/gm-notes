import type { UUID } from 'crypto';
import type { Message, MessageType } from './Message.ts';

export interface IMessageSubscriber<TType extends MessageType> {
	handle: (message: Message<TType>) => Promise<UUID>;
}
