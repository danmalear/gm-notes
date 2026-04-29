import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface EventRec {
	EventId: UUID;
	StreamId: UUID;
	CorrelationId: UUID;
	Context: string;
	Ref: string;
	Version: number;
	Data: object;
	OccurredAt: string;
}

export const tableName = 'es_Event';
export const pkColumn = 'EventId';

export class EventRepository extends Repository<EventRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<EventRec | undefined> {
		return await this.getByIdRaw(id);
	}
}
