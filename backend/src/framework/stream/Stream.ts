import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Message } from '#message/Message.ts';
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

export abstract class Stream<T> implements IMessageSubscriber {
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

	abstract handle(event: Message): Promise<UUID>;
}
