import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type StreamMin = Scalars<Models.es_Stream>;

export type IStreamRepository = IRepository<StreamMin, StreamMin, StreamMin>;

export class StreamRepository
	extends Repository<StreamMin, StreamMin, StreamMin>
	implements IStreamRepository
{
	override descriptor = 'Stream';

	override async getByIdRaw(streamId: UUID): Promise<StreamMin | null> {
		try {
			return await db.orm.es.Stream.first({
				StreamId: streamId,
			});
		} catch (e) {
			throw this.getByIdError(streamId, e);
		}
	}

	override async getById(commandId: UUID): Promise<StreamMin | null> {
		return await this.getByIdRaw(commandId);
	}

	override async getAll(): Promise<StreamMin[]> {
		try {
			return await db.orm.es.Stream.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: StreamMin): Promise<StreamMin> {
		try {
			return await db.orm.es.Stream.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		streamId: UUID,
		data: Partial<StreamMin>,
	): Promise<StreamMin | null> {
		try {
			return await db.orm.es.Stream.where({
				StreamId: streamId,
			}).update(data);
		} catch (e) {
			throw this.updateError(streamId, e);
		}
	}
}
