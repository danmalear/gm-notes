import { randomUUID, type UUID } from 'crypto';
import type { IMessageSubscriber } from './IMessageSubscriber.ts';
import type { Message } from './Message.ts';

export interface IMessageBus {
	subscribe: (context: string, handler: IMessageSubscriber) => void;
	send: <TMessage extends Message>(message: TMessage) => Promise<UUID>;
}

export class MessageBus implements IMessageBus {
	subscribers: Record<string, IMessageSubscriber[]>;

	constructor() {
		this.subscribers = {};
	}

	subscribe(context: string, handler: IMessageSubscriber) {
		if (!this.subscribers[context]) {
			this.subscribers[context] = [];
		}
		this.subscribers[context].push(handler);
	}

	// @TODO find a better way to handle IDs - this is ugly as hell
	async send<TMessage extends Message>(message: TMessage) {
		const { context } = message;
		if (!this.subscribers[context]) {
			return randomUUID();
		}
		let id: UUID | undefined;
		for (const handler of this.subscribers[context]) {
			id = await handler.handle(message);
		}
		return id ?? message.streamId ?? randomUUID();
	}
}
