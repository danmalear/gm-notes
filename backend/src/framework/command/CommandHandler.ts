import type { EventRepository } from '#event/event-repository.ts';
import type { IEventBus } from '#event/EventBus.ts';
import type { StreamRepository } from '#framework/stream/stream-repository.ts';
import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Command } from './Command.ts';

export interface CommandHandlerConfig {
	eventBus: IEventBus;
	eventRepository: EventRepository;
	streamRepository: StreamRepository;
}

export abstract class CommandHandler
	implements IMessageSubscriber<'Command', Command>
{
	eventBus: IEventBus;
	eventRepository: EventRepository;
	streamRepository: StreamRepository;

	constructor({
		eventBus,
		eventRepository,
		streamRepository,
	}: CommandHandlerConfig) {
		this.eventBus = eventBus;
		this.eventRepository = eventRepository;
		this.streamRepository = streamRepository;
	}

	abstract handle(command: Command): Promise<void>;
}
