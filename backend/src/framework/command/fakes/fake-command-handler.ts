import type { EventBus } from '#event/event-bus.ts';
import type { EventRepository } from '#event/event-repository.ts';
import { FakeEventBus } from '#event/fakes/fake-event-bus.ts';
import { FakeEventRepository } from '#event/fakes/fake-event-repository.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/fake-stream-repository.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import type { CommandHandler } from '../command-handler.ts';

const zeroCalls: FakerCalls<CommandHandler> = {
	validateCommandVersion: 0,
	handle: 0,
};

export class FakeCommandHandler
	implements Faker<CommandHandler>, ICloneable<FakeCommandHandler>
{
	eventBus: EventBus;
	eventRepository: EventRepository;
	streamRepository: StreamRepository;
	calls: FakerCalls<CommandHandler>;

	constructor() {
		this.eventBus = new FakeEventBus();
		this.eventRepository = new FakeEventRepository();
		this.streamRepository = new FakeStreamRepository();
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	async validateCommandVersion() {
		this.calls.validateCommandVersion++;
		return;
	}

	async handle() {
		this.calls.handle++;
		return;
	}

	clone() {
		const newHandler = new FakeCommandHandler();
		newHandler.calls = {
			...this.calls,
		};
		return newHandler;
	}
}
