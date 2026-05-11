import type { CommandHandler } from '#command/CommandHandler.ts';
import { fakeEventBus } from '#event/test/event-bus-fake.ts';
import { getFakeEventRepository } from '#event/test/event-repository-fake.ts';
import { getFakeStreamRepository } from '#framework/stream/test/stream-repository-fake.ts';

export const fakeCommandHandler: CommandHandler = {
	eventBus: fakeEventBus,
	eventRepository: getFakeEventRepository(),
	streamRepository: getFakeStreamRepository(),
	validateCommandVersion: () => Promise.resolve(),
	handle: () => Promise.resolve(),
};
