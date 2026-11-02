import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type FileRaw = Scalars<Models.public_File>;
export type FileMin = FileRaw;
export type FileFull = FileMin;

export interface IFileRepository extends IRepository<
	FileRaw,
	FileMin,
	FileFull
> {
	getByIdFull(fileId: string): Promise<FileMin | null>;
}

export class FileRepository
	extends Repository<FileRaw, FileMin, FileFull>
	implements IFileRepository
{
	override descriptor = 'File';

	override async getByIdMin(fileId: string): Promise<FileMin | null> {
		try {
			return await db.orm.public.File.first({
				FileId: fileId,
			});
		} catch (e) {
			// @ts-expect-error This is a rare case of the ID column not being in UUID format
			throw this.getByIdError(fileId, e);
		}
	}

	override async getByIdFull(fileId: string): Promise<FileFull | null> {
		return await this.getByIdMin(fileId);
	}

	override async getAll(): Promise<FileMin[]> {
		try {
			return await db.orm.public.File.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: FileRaw): Promise<FileMin> {
		try {
			return await db.orm.public.File.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		fileId: UUID,
		data: Partial<FileRaw>,
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
