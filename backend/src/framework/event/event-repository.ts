import type {
	EventCreateInput,
	EventModel,
	EventUpdateInput,
} from '#prisma-models/Event.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'node:crypto';

export interface IEventRepository
	extends IRepository<EventModel, EventCreateInput, EventUpdateInput> {
	getByStreamId(streamId: UUID): Promise<EventModel[]>;
}

export class EventRepository
	extends Repository<EventModel, EventCreateInput, EventUpdateInput>
	implements IEventRepository
{
	override descriptor = 'Event';

	override async getByIdRaw(eventId: UUID): Promise<EventModel | null> {
		try {
			return await this.prisma.event.findUnique({
				where: {
					EventId: eventId,
				},
			});
		} catch (e) {
			throw this.getByIdError(eventId, e);
		}
	}

	override async getById(eventId: UUID): Promise<EventModel | null> {
		return await this.getByIdRaw(eventId);
	}

	override async getAll(): Promise<EventModel[]> {
		try {
			return await this.prisma.event.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: EventCreateInput): Promise<EventModel> {
		try {
			return await this.prisma.event.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		eventId: UUID,
		data: EventUpdateInput,
	): Promise<EventModel> {
		try {
			return await this.prisma.event.update({
				where: {
					EventId: eventId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(eventId, e);
		}
	}

	/**
	 * Retrieves event records from the database for a given stream ID
	 * @param id UUID of the stream to get events for
	 * @returns The list of events (empty array if none found)
	 */
	async getByStreamId(streamId: UUID): Promise<EventModel[]> {
		try {
			return await this.prisma.event.findMany({
				where: {
					StreamId: streamId,
				},
			});
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Stream ID ${streamId}: ${getMessage(e)}`,
			);
		}
	}
}
