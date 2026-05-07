import type { EventRepository } from '#event/event-repository.ts';
import { Event } from '#event/Event.ts';
import { InternalError, NotImplementedError } from '#shared/error.ts';
import type { UUID } from 'crypto';
import _ from 'lodash';
import type { StreamRepository } from './stream-repository.ts';

export interface StreamConfig {
	streamRepository: StreamRepository;
	eventRepository: EventRepository;
}

export interface AggregateOpts {
	version?: number;
	snapshotAt?: string;
}

export abstract class Stream<TAggregate> {
	streamRepository: StreamRepository;
	eventRepository: EventRepository;
	id: UUID;
	#aggregateOptsCache: AggregateOpts | undefined;
	#aggregateCache: TAggregate | undefined;

	constructor(id: UUID, { streamRepository, eventRepository }: StreamConfig) {
		this.id = id;
		this.streamRepository = streamRepository;
		this.eventRepository = eventRepository;
	}

	async getVersion() {
		const stream = await this.streamRepository.getById(this.id);
		if (!stream) {
			throw new InternalError('Unable to fetch stream');
		}
		return stream.Version;
	}

	async getAggregate(opts: AggregateOpts = {}): Promise<TAggregate> {
		if (_.eq(opts, this.#aggregateOptsCache) && !!this.#aggregateCache) {
			return this.#aggregateCache;
		}

		this.#aggregateCache = this.emptyRecord;

		const eventRecs = await this.eventRepository.getByStreamId(this.id);

		for (const eventRec of eventRecs) {
			const event: Event = new Event({
				context: eventRec.Context,
				ref: eventRec.Ref,
				streamId: this.id,
				correlationId: eventRec.CorrelationId,
				streamVersion: eventRec.Version,
				data: eventRec.Data,
			});
			this.applyEvent(this.#aggregateCache, event);
		}

		throw new NotImplementedError();
	}

	abstract emptyRecord: TAggregate;

	abstract applyEvent(aggregate: TAggregate, event: Event): Promise<void>;
}
