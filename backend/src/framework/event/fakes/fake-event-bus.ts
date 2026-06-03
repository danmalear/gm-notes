import type { EventRepository } from '#event/event-repository.ts';
import type { IEventSubscriber } from '#event/event-subscriber.ts';
import { FakeWebSocketServer } from '#framework/fakes/FakeWebsocketServer.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/fake-stream-repository.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import type { UUID } from 'crypto';
import { randomUUID } from 'crypto';
import type { WebSocketServer } from 'ws';
import type { EventBus } from '../event-bus.ts';
import { FakeEventRepository } from './fake-event-repository.ts';

const zeroCalls: FakerCalls<EventBus> = {
	send: 0,
	subscribe: 0,
};

export class FakeEventBus implements Faker<EventBus> {
	eventRepository: EventRepository;
	streamRepository: StreamRepository;
	wss: WebSocketServer;
	subscribers: Record<string, IEventSubscriber[]>;
	calls: FakerCalls<EventBus>;

	constructor() {
		this.eventRepository = new FakeEventRepository();
		this.streamRepository = new FakeStreamRepository();
		this.wss = new FakeWebSocketServer();
		this.subscribers = {};
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	clone() {
		return new FakeEventBus();
	}

	async send(): Promise<UUID> {
		return randomUUID();
	}

	cloneSubscribers() {
		return {};
	}

	subscribe() {
		return;
	}
}
