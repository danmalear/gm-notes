import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';

export type IEventBus = IMessageBus<'Event'>;

export class EventBus extends MessageBus<'Event'> implements IEventBus {
	constructor() {
		super('Event');
	}
}
