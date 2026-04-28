import { randomUUID, type UUID } from 'crypto';
import type { IMessageSubscriber } from './IMessageSubscriber.ts';
import type { Message, MessageType } from './Message.ts';

export interface IMessageBus<TType extends MessageType> {
	subscribe: (
		context: string,
		handler: IMessageSubscriber<TType, Message<TType>>,
	) => void;
	send: (message: Message<TType>) => Promise<UUID>;
}

export class MessageBus<TType extends MessageType>
	implements IMessageBus<TType>
{
	subscribers: Record<string, IMessageSubscriber<TType, Message<TType>>[]>;
	messageType: TType;

	constructor(messageType: TType) {
		this.subscribers = {};
		this.messageType = messageType;
	}

	// @TODO account for messageType
	/**
	 * Add a class with a handle method to the list of subscribers, so new messages will be processed
	 *
	 * @param context Context to listen to
	 * @param handler A class that can handle messages of the specified type
	 */
	subscribe(
		context: string,
		handler: IMessageSubscriber<TType, Message<TType>>,
	) {
		if (!this.subscribers[context]) {
			this.subscribers[context] = [];
		}
		this.subscribers[context].push(handler);
	}

	// @TODO find a better way to handle IDs - this is ugly as hell
	async send<TMessage extends Message<TType>>(message: TMessage) {
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
