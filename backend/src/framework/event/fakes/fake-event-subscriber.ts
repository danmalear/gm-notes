import type { EventBus } from '#event/event-bus.ts';
import type { EventRepository } from '#event/event-repository.ts';
import { FakeEventBus } from '#event/fakes/fake-event-bus.ts';
import { FakeEventRepository } from '#event/fakes/fake-event-repository.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/fake-stream-repository.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { Faker, FakerCalls } from '#shared/Faker.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { IEventSubscriber } from '../event-subscriber.ts';

const zeroCalls: FakerCalls<IEventSubscriber> = {
	handle: 0,
};

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
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
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
