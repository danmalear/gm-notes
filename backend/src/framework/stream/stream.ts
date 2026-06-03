import type { EventRepository } from '#event/event-repository.ts';
import type { IEvent } from '#event/event.ts';
import {
	BadRequestError,
	InternalError,
	NotImplementedError,
} from '#shared/error.ts';
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

export abstract class Stream<TRec> {
	streamRepository: StreamRepository;
	eventRepository: EventRepository;
	id: UUID;
	#aggregateOptsCache: AggregateOpts | undefined;
	#aggregateCache: TRec | undefined;

	constructor(id: UUID, { streamRepository, eventRepository }: StreamConfig) {
		this.id = id;
		this.streamRepository = streamRepository;
		this.eventRepository = eventRepository;
	}

	async getVersion() {
		const stream = await this.streamRepository.getById(this.id);
		return stream?.Version ?? 0;
	}

	async validateVersion(expectedVersion: number) {
		const streamVersion = await this.getVersion();
		if (expectedVersion < 0) {
			throw new InternalError(
				`Invalid expected version for stream: ${expectedVersion}`,
			);
		}
		if (streamVersion === 0 && expectedVersion > 0) {
			throw new BadRequestError(
				`Expected stream version ${expectedVersion} but no stream found`,
			);
		}
		if (streamVersion > 0 && expectedVersion === 0) {
			throw new BadRequestError(
				`Expected stream not to exist, but stream was found`,
			);
		}
		if (streamVersion !== expectedVersion) {
			throw new BadRequestError(
				`Stream version ${streamVersion} does not match expected version ${expectedVersion}`,
			);
		}
	}

	async getAggregate(opts: AggregateOpts = {}): Promise<TRec> {
		if (_.eq(opts, this.#aggregateOptsCache) && !!this.#aggregateCache) {
			return this.#aggregateCache;
		}

		this.#aggregateCache = this.emptyRecord;

		const eventModels = await this.eventRepository.getByStreamId(this.id);

		for (const eventModel of eventModels) {
			// Assume UUID/JSON data is stored correctly - for now at least
			const event: IEvent = {
				context: eventModel.Context,
				ref: eventModel.Ref,
				streamId: this.id,
				correlationId: eventModel.CorrelationId as UUID,
				streamVersion: eventModel.Version,
				data: eventModel.Data as object,
			};
			this.applyEvent(this.#aggregateCache, event);
		}

		throw new NotImplementedError();
	}

	abstract emptyRecord: TRec;

	abstract applyEvent(aggregate: TRec, event: IEvent): Promise<void>;
}

/**
 * A utility class for loading streams outside of specific contexts,
 * while still having access to features like version checking
 */
export class RawStream extends Stream<Record<string, never>> {
	override emptyRecord: Record<string, never>;

	constructor(id: UUID, streamConfig: StreamConfig) {
		super(id, streamConfig);
		this.emptyRecord = {};
	}

	override async applyEvent() {}
}
