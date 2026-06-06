import type {
	EventCreateInput,
	EventDelegate,
	EventModel,
	EventUpdateInput,
	EventWhereInput,
	EventWhereUniqueInput,
} from '#prisma-models/Event.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'node:crypto';

export interface IEventRepository
	extends IRepository<EventModel, EventCreateInput, EventUpdateInput> {
	getByStreamId(streamId: UUID): Promise<EventModel[]>;
}

export class EventRepository
	extends Repository<
		EventModel,
		EventCreateInput,
		EventUpdateInput,
		EventWhereUniqueInput,
		EventWhereInput,
		EventDelegate
	>
	implements IEventRepository
{
	override descriptor = 'Event';
	override delegate = this.prisma.event;

	async getByIdRaw(eventId: UUID): Promise<EventModel | null> {
		return await this.$getOne({
			where: {
				EventId: eventId,
			},
		});
	}

	async getById(eventId: UUID): Promise<EventModel | null> {
		return await this.getByIdRaw(eventId);
	}

	async update(eventId: UUID, data: EventUpdateInput): Promise<EventModel> {
		return await this.$update({
			where: {
				EventId: eventId,
			},
			data,
		});
	}

	async getByStreamId(streamId: UUID): Promise<EventModel[]> {
		return await this.$getMany({
			where: {
				StreamId: streamId,
			},
		});
	}
}
