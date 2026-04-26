import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type Event } from './Event.ts';

export class EventRepository extends Repository<Event> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<Event | undefined> {
		return await this.getByIdRaw(id);
	}
}
