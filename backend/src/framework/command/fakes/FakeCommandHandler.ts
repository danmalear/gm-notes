import type { EventRepository } from '#event/event-repository.ts';
import type { EventBus } from '#event/EventBus.ts';
import { FakeEventBus } from '#event/fakes/FakeEventBus.ts';
import { FakeEventRepository } from '#event/fakes/FakeEventRepository.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/FakeStreamRepository.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { Faker, FakerCalls } from '#shared/Faker.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { CommandHandler } from '../CommandHandler.ts';

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
		this.calls = {
			validateCommandVersion: 0,
			handle: 0,
		};
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
		return new FakeCommandHandler();
	}
}
