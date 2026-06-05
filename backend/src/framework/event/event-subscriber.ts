import type { IMessageSubscriber } from '#message/message-subscriber.ts';
import type { IEvent } from './event.ts';

export type IEventSubscriber = IMessageSubscriber<IEvent>;
