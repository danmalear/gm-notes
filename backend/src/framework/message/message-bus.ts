import { type UUID } from 'crypto';
import type { IMessageSubscriber } from './message-subscriber.ts';
import type { IMessage } from './message.ts';

export interface IMessageBus<TMessage extends IMessage> {
	subscribe: (context: string, handler: IMessageSubscriber<TMessage>) => void;
	send: (message: TMessage) => Promise<UUID>;
}

export class MessageBus<TMessage extends IMessage>
	implements IMessageBus<TMessage>
{
	subscribers: Record<string, IMessageSubscriber<TMessage>[]>;

	constructor() {
		this.subscribers = {};
	}

	/**
	 * Add a class with a handle method to the list of subscribers, so new messages will be processed
	 *
	 * @param context Context to listen to
	 * @param handler A class that can handle messages of the specified type
	 */
	subscribe(context: string, handler: IMessageSubscriber<TMessage>) {
		if (!this.subscribers[context]) {
			this.subscribers[context] = [];
		}
		// Don't register the same subscriber twice (allowing for the same kind for now)
		if (this.subscribers[context].includes(handler)) {
			return;
		}
		this.subscribers[context].push(handler);
	}

	async send(message: TMessage) {
		console.log('Processing message', message.ref);
		const { context } = message;
		if (!this.subscribers[context]) {
			return message.correlationId;
		}
		for (const handler of this.subscribers[context]) {
			await handler.handle(message);
		}

		return message.correlationId;
	}
}
