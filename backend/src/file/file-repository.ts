import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type FileMin = Scalars<Models.public_File>;

export interface IFileRepository
	extends IRepository<FileMin, FileMin, FileMin> {
	getById(fileId: string): Promise<FileMin | null>;
}

export class FileRepository
	extends Repository<FileMin, FileMin, FileMin>
	implements IFileRepository
{
	override descriptor = 'File';

	override async getByIdRaw(fileId: string): Promise<FileMin | null> {
		try {
			return await db.orm.public.File.first({
				FileId: fileId,
			});
		} catch (e) {
			// @ts-expect-error This is a rare case of the ID column not being in UUID format
			throw this.getByIdError(fileId, e);
		}
	}

	override async getById(fileId: string): Promise<FileMin | null> {
		return await this.getByIdRaw(fileId);
	}

	override async getAll(): Promise<FileMin[]> {
		try {
			return await db.orm.public.File.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: FileMin): Promise<FileMin> {
		try {
			return await db.orm.public.File.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		fileId: UUID,
		data: Partial<FileMin>,
	): Promise<FileMin | null> {
		try {
			return await db.orm.public.File.where({
				FileId: fileId,
			}).update(data);
		} catch (e) {
			throw this.updateError(fileId, e);
		}
	}
}
