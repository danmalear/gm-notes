import { getFakeStreamRepository } from '#framework/stream/fakes/stream-repository-fake.ts';
import { fakeWss } from '#framework/test/websocket-fake.ts';
import { randomUUID } from 'crypto';
import type { EventBus } from '../EventBus.ts';
import { getFakeEventRepository } from './event-repository-fake.ts';

export const fakeEventBus: EventBus = {
	eventRepository: getFakeEventRepository(),
	streamRepository: getFakeStreamRepository(),
	subscribers: {},
	wss: fakeWss,
	send: () => Promise.resolve(randomUUID()),
	subscribe: () => undefined,
};
