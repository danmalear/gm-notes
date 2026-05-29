import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Event } from './event-temp.ts';

export type IEventSubscriber = IMessageSubscriber<'Event', Event>;
