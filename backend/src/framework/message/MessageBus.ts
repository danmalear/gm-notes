import { randomUUID, type UUID } from 'crypto';
import type { IMessage, MessageType } from './IMessage.ts';
import type { IMessageSubscriber } from './IMessageSubscriber.ts';

export interface IMessageBus<TType extends MessageType> {
	subscribe: (
		context: string,
		handler: IMessageSubscriber<TType, IMessage<TType>>,
	) => void;
	send: (message: IMessage<TType>) => Promise<UUID>;
}

export class MessageBus<TType extends MessageType>
	implements IMessageBus<TType>
{
	subscribers: Record<string, IMessageSubscriber<TType, IMessage<TType>>[]>;
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
		handler: IMessageSubscriber<TType, IMessage<TType>>,
	) {
		if (!this.subscribers[context]) {
			this.subscribers[context] = [];
		}
		this.subscribers[context].push(handler);
	}

	// @TODO find a better way to handle IDs - this is ugly as hell
	async send<TMessage extends IMessage<TType>>(message: TMessage) {
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
