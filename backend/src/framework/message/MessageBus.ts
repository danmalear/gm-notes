import { randomUUID, type UUID } from 'crypto';
import type { IMessageSubscriber } from './IMessageSubscriber.ts';
import type { Message, MessageType } from './Message.ts';

export interface IMessageBus<TType extends MessageType> {
	subscribe: (context: string, handler: IMessageSubscriber<TType>) => void;
	send: (message: Message<TType>) => Promise<UUID>;
}

export class MessageBus<TType extends MessageType>
	implements IMessageBus<TType>
{
	subscribers: Record<string, IMessageSubscriber<TType>[]>;
	messageType: TType;

	constructor(messageType: TType) {
		this.subscribers = {};
		this.messageType = messageType;
	}

	subscribe(context: string, handler: IMessageSubscriber<TType>) {
		if (!this.subscribers[context]) {
			this.subscribers[context] = [];
		}
		this.subscribers[context].push(handler);
	}

	// @TODO find a better way to handle IDs - this is ugly as hell
	async send(message: Message<TType>) {
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
