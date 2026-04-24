import type { UUID } from 'crypto';
import type { IMessageSubscriber } from './IMessageSubscriber.ts';
import type { Message } from './Message.ts';

export interface IMessageBus {
	subscribe: (context: string, handler: IMessageSubscriber) => void;
	send: <TMessage extends Message>(message: TMessage) => Promise<UUID>;
}

export class MessageBus implements IMessageBus {
	subscribers: Record<string, IMessageSubscriber>;

	constructor() {
		this.subscribers = {};
	}

	subscribe(context: string, handler: IMessageSubscriber) {
		this.subscribers[context] = handler;
	}

	async send<TMessage extends Message>(message: TMessage) {
		const { context } = message;
		return await this.subscribers[context].handle(message);
	}
}
