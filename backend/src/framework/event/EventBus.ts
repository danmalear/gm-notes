import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';
import { InternalError } from '#shared/error.ts';
import type { StreamRepository } from '#stream/stream-repository.ts';
import { randomUUID, type UUID } from 'crypto';
import type { EventRec, EventRepository } from './event-repository.ts';
import type { Event } from './Event.ts';

export type IEventBus = IMessageBus<'Event', Event>;

export class EventBus extends MessageBus<'Event', Event> implements IEventBus {
	eventRepository: EventRepository;
	streamRepository: StreamRepository;

	constructor(
		eventRepository: EventRepository,
		streamRepository: StreamRepository,
	) {
		super('Event');
		this.eventRepository = eventRepository;
		this.streamRepository = streamRepository;
	}

	override async send(event: Event): Promise<UUID> {
		const id = randomUUID();
		const correlationId = randomUUID();

		const stream = await this.streamRepository.getById(event.streamId);

		if (!stream) {
			throw new InternalError(
				`Stream ${event.streamId} not found for event ${event.context} ${event.ref}`,
			);
		}

		// @TODO version control - add expected versions to avoid conflicts

		const eventRecord: EventRec = {
			EventId: id,
			StreamId: event.streamId,
			CorrelationId: correlationId,
			Context: event.context,
			Ref: event.ref,
			Data: event.data,
			Version: stream.Version + 1,
			OccurredAt: new Date().toISOString(),
		};

		await this.eventRepository.insert(eventRecord);
		return await super.send(event);
	}
}
