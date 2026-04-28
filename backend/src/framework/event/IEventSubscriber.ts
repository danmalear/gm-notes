import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Event } from './Event.ts';

export type IEventSubscriber<TEvent extends Event> = IMessageSubscriber<
	'Event',
	TEvent
>;
