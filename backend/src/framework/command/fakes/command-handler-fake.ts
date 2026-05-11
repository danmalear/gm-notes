import { fakeEventBus } from '#event/fakes/event-bus-fake.ts';
import { getFakeEventRepository } from '#event/fakes/event-repository-fake.ts';
import { getFakeStreamRepository } from '#framework/stream/fakes/stream-repository-fake.ts';
import type { CommandHandler } from '../CommandHandler.ts';

export const fakeCommandHandler: CommandHandler = {
	eventBus: fakeEventBus,
	eventRepository: getFakeEventRepository(),
	streamRepository: getFakeStreamRepository(),
	validateCommandVersion: () => Promise.resolve(),
	handle: () => Promise.resolve(),
};
