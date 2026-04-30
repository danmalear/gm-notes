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
		super();
		this.eventRepository = eventRepository;
		this.streamRepository = streamRepository;
	}

	override async send(event: Event): Promise<UUID> {
		const id = randomUUID();
		const correlationId = randomUUID();

		let streamRecord = await this.streamRepository.getById(event.streamId);

		if (!streamRecord && event.streamVersion > 0) {
			throw new InternalError(
				`Stream ${event.streamId} not found for event ${event.context} ${event.ref}`,
			);
		}

		const version = streamRecord?.Version ?? 0;

		if (version !== event.streamVersion) {
			throw new InternalError(
				`Stream version ${version} does not match event version ${event.streamVersion}.`,
			);
		}

		if (version === 0) {
			streamRecord = await this.streamRepository.insert({
				StreamId: event.streamId,
				Type: event.context,
				Version: 1,
				CreatedAt: new Date().toISOString(),
				UpdatedAt: new Date().toISOString(),
			});
		}

		if (!streamRecord) {
			throw new InternalError(
				`Cannot retrieve stream record for ID ${event.streamId}`,
			);
		}

		const eventRecord: EventRec = {
			EventId: id,
			StreamId: event.streamId,
			CorrelationId: correlationId,
			Context: event.context,
			Ref: event.ref,
			Data: event.data,
			Version: version + 1,
			OccurredAt: new Date().toISOString(),
		};

		await this.eventRepository.insert(eventRecord);
		return await super.send(event);
	}
}
