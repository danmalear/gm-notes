import type { EventRepository } from '#event/event-repository.ts';
import type { IEventSubscriber } from '#event/IEventSubscriber.ts';
import { fakeWss } from '#framework/fakes/websocket-fake.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/FakeStreamRepository.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { UUID } from 'crypto';
import { randomUUID } from 'crypto';
import type { WebSocketServer } from 'ws';
import type { EventBus } from '../EventBus.ts';
import { FakeEventRepository } from './FakeEventRepository.ts';

export class FakeEventBus implements EventBus {
	eventRepository: EventRepository;
	streamRepository: StreamRepository;
	wss: WebSocketServer;
	subscribers: Record<string, IEventSubscriber[]>;

	constructor() {
		this.eventRepository = new FakeEventRepository();
		this.streamRepository = new FakeStreamRepository();
		this.wss = fakeWss;
		this.subscribers = {};
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
