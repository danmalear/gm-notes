import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type StreamRaw = Scalars<Models.es_Stream>;
export type StreamMin = StreamRaw;
export type StreamFull = StreamMin;

export type IStreamRepository = IRepository<StreamRaw, StreamMin, StreamFull>;

export class StreamRepository
	extends Repository<StreamRaw, StreamMin, StreamFull>
	implements IStreamRepository
{
	override descriptor = 'Stream';

	override async getByIdMin(streamId: UUID): Promise<StreamMin | null> {
		try {
			return await db.orm.es.Stream.first({
				StreamId: streamId,
			});
		} catch (e) {
			throw this.getByIdError(streamId, e);
		}
	}

	override async getByIdFull(commandId: UUID): Promise<StreamFull | null> {
		return await this.getByIdMin(commandId);
	}

	override async getAll(): Promise<StreamMin[]> {
		try {
			return await db.orm.es.Stream.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: StreamRaw): Promise<StreamMin> {
		try {
			return await db.orm.es.Stream.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		streamId: UUID,
		data: Partial<StreamRaw>,
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
