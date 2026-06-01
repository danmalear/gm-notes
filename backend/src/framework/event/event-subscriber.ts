import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { IEvent } from './event.ts';

export type IEventSubscriber = IMessageSubscriber<IEvent>;
