import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'node:crypto';

export type EventRaw = Scalars<Models.es_Event>;
export type EventMin = EventRaw;
export type EventFull = EventMin;

export interface IEventRepository extends IRepository<
	EventRaw,
	EventMin,
	EventFull
> {
	getByStreamId(streamId: UUID): Promise<EventMin[]>;
}

export class EventRepository
	extends Repository<EventRaw, EventMin, EventFull>
	implements IEventRepository
{
	override descriptor = 'Event';

	override async getByIdMin(eventId: UUID): Promise<EventMin | null> {
		try {
			return await db.orm.es.Event.first({
				EventId: eventId,
			});
		} catch (e) {
			throw this.getByIdError(eventId, e);
		}
	}

	override async getByIdFull(eventId: UUID): Promise<EventFull | null> {
		return await this.getByIdMin(eventId);
	}

	override async getAll(): Promise<EventMin[]> {
		try {
			return await db.orm.es.Event.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: EventRaw): Promise<EventMin> {
		try {
			return await db.orm.es.Event.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		eventId: UUID,
		data: Partial<EventRaw>,
	): Promise<EventMin | null> {
		try {
			return await db.orm.es.Event.where({
				EventId: eventId,
			}).update(data);
		} catch (e) {
			throw this.updateError(eventId, e);
		}
	}

	/**
	 * Retrieves event records from the database for a given stream ID
	 * @param id UUID of the stream to get events for
	 * @returns The list of events (empty array if none found)
	 */
	async getByStreamId(streamId: UUID): Promise<EventMin[]> {
		try {
			return await db.orm.es.Event.where({
				StreamId: streamId,
			}).all();
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Stream ID ${streamId}: ${getMessage(e)}`,
			);
		}
	}
}
