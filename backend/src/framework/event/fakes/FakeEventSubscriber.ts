import type { EventRepository } from '#event/event-repository.ts';
import type { EventBus } from '#event/EventBus.ts';
import { FakeEventBus } from '#event/fakes/FakeEventBus.ts';
import { FakeEventRepository } from '#event/fakes/FakeEventRepository.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/FakeStreamRepository.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { Faker, FakerCalls } from '#shared/Faker.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { IEventSubscriber } from '../IEventSubscriber.ts';

export class FakeEventSubscriber
	implements Faker<IEventSubscriber>, ICloneable<FakeEventSubscriber>
{
	eventBus: EventBus;
	eventRepository: EventRepository;
	streamRepository: StreamRepository;
	calls: FakerCalls<IEventSubscriber>;

	constructor() {
		this.eventBus = new FakeEventBus();
		this.eventRepository = new FakeEventRepository();
		this.streamRepository = new FakeStreamRepository();
		this.calls = {
			handle: 0,
		};
	}

	resetCalls() {
		this.calls = {
			handle: 0,
		};
	}

	async handle() {
		this.calls.handle++;
		return;
	}

	clone() {
		const newSubscriber = new FakeEventSubscriber();
		newSubscriber.calls = {
			...this.calls,
		};
		return newSubscriber;
	}
}
