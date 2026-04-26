import { NotImplementedError } from '#shared/error.ts';
import type { UUID } from 'crypto';
import type { StreamRepository } from './StreamRepository.ts';

export interface StreamConfig {
	streamRepository: StreamRepository;
}

export interface LoadAggregateOpts {
	version?: number;
	snapshotAt?: string;
}

export class Stream<T> {
	streamRepository: StreamRepository;
	id: UUID;
	aggregate: T;

	constructor(id: UUID, { streamRepository }: StreamConfig) {
		this.id = id;
		this.streamRepository = streamRepository;
		this.aggregate = this.loadAggregate();
	}

	loadAggregate({
		version: _version,
		snapshotAt: _snapshotAt,
	}: LoadAggregateOpts = {}): T {
		throw new NotImplementedError();
	}
}
