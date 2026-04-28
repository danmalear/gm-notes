import type { Event } from '#event/Event.ts';
import { NotImplementedError } from '#shared/error.ts';
import type { UUID } from 'crypto';
import type { StreamRepository } from './stream-repository.ts';

export interface StreamConfig {
	streamRepository: StreamRepository;
}

export interface LoadAggregateOpts {
	version?: number;
	snapshotAt?: string;
}

export abstract class Stream<TAggregate, TEvent extends Event> {
	streamRepository: StreamRepository;
	id: UUID;
	aggregate: TAggregate;

	constructor(id: UUID, { streamRepository }: StreamConfig) {
		this.id = id;
		this.streamRepository = streamRepository;
		this.aggregate = this.loadAggregate();
	}

	loadAggregate({
		version: _version,
		snapshotAt: _snapshotAt,
	}: LoadAggregateOpts = {}): TAggregate {
		throw new NotImplementedError();
	}

	abstract applyEvent(event: TEvent): Promise<UUID>;
}
