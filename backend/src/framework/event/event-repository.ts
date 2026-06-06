import type {
	EventCreateInput,
	EventModel,
	EventUpdateInput,
} from '#prisma-models/Event.ts';
import type { PrismaClient } from '#prisma/generated/client.ts';
import { getMessage } from '#shared/error.ts';
import type { IRepository, IRepositoryConfig } from '#shared/repository.ts';
import type { UUID } from 'node:crypto';

export class EventRepository
	implements IRepository<EventModel, EventCreateInput, EventUpdateInput>
{
	prisma: PrismaClient;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	async getByIdRaw(eventId: UUID): Promise<EventModel | null> {
		try {
			return await this.prisma.event.findUnique({
				where: {
					EventId: eventId,
				},
			});
		} catch (e) {
			throw new Error(`Error getting Event by ID: ${getMessage(e)}`);
		}
	}

	async getById(eventId: UUID): Promise<EventModel | null> {
		return await this.getByIdRaw(eventId);
	}

	async getAll(): Promise<EventModel[]> {
		try {
			return await this.prisma.event.findMany();
		} catch (e) {
			throw new Error(`Error getting all Event records: ${getMessage(e)}`);
		}
	}

	async insert(data: EventCreateInput): Promise<EventModel> {
		try {
			return await this.prisma.event.create({
				data,
			});
		} catch (e) {
			throw new Error(`Error creating new Event: ${getMessage(e)}`);
		}
	}

	async update(eventId: UUID, data: EventUpdateInput): Promise<EventModel> {
		try {
			return await this.prisma.event.update({
				where: {
					EventId: eventId,
				},
				data,
			});
		} catch (e) {
			throw new Error(
				`Error updating Event with ID ${eventId}: ${getMessage(e)}`,
			);
		}
	}

	async getByStreamId(streamId: UUID) {
		try {
			return await this.prisma.event.findMany({
				where: {
					StreamId: streamId,
				},
			});
		} catch (e) {
			throw Error(
				`Error getting Event records for stream ID ${streamId}: ${getMessage(e)}`,
			);
		}
	}
}
