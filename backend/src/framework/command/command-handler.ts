import type { IEventBus } from '#event/event-bus.ts';
import type { IEventRepository } from '#event/event-repository.ts';
import type { IStreamRepository } from '#framework/stream/stream-repository.ts';
import type { Stream } from '#framework/stream/stream.ts';
import type { IMessageSubscriber } from '#message/message-subscriber.ts';
import type { ICommand } from './command.ts';

export interface CommandHandlerConfig {
	eventBus: IEventBus;
	eventRepository: IEventRepository;
	streamRepository: IStreamRepository;
}

export abstract class CommandHandler implements IMessageSubscriber<ICommand> {
	eventBus: IEventBus;
	eventRepository: IEventRepository;
	streamRepository: IStreamRepository;

	constructor({
		eventBus,
		eventRepository,
		streamRepository,
	}: CommandHandlerConfig) {
		this.eventBus = eventBus;
		this.eventRepository = eventRepository;
		this.streamRepository = streamRepository;
	}

	async validateCommandVersion(
		stream: Stream<unknown> | undefined,
		command: ICommand,
	) {
		if (stream && command.streamVersion !== undefined) {
			await stream.validateVersion(command.streamVersion);
		}
	}

	abstract handle(command: ICommand): Promise<void>;
}
