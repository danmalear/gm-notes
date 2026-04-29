import type { IMessage } from '#message/IMessage.ts';
import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';
import type { UUID } from 'crypto';

export type IEventBus = IMessageBus<'Event'>;

export class EventBus extends MessageBus<'Event'> implements IEventBus {
	constructor() {
		super('Event');
	}

	override send<TEvent extends IMessage<'Event'>>(
		message: TEvent,
	): Promise<UUID> {
		return super.send(message);
	}
}
