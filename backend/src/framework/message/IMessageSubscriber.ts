import type { UUID } from 'crypto';
import type { Message } from './Message.ts';

export interface IMessageSubscriber {
	handle: (message: Message) => Promise<UUID>;
}
