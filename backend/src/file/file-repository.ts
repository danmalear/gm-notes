import type {
	FileCreateInput,
	FileModel,
	FileUpdateInput,
} from '#prisma-models/File.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface IFileRepository
	extends IRepository<FileModel, FileCreateInput, FileUpdateInput> {
	getById(fileId: string): Promise<FileModel | null>;
}

export class FileRepository
	extends Repository<FileModel, FileCreateInput, FileUpdateInput>
	implements IFileRepository
{
	override descriptor = 'File';

	override async getByIdRaw(fileId: string): Promise<FileModel | null> {
		try {
			return await this.prisma.file.findUnique({
				where: {
					FileId: fileId,
				},
			});
		} catch (e) {
			// @ts-expect-error This is a rare case of the ID column not being in UUID format
			throw this.getByIdError(fileId, e);
		}
	}

	override async getById(fileId: string): Promise<FileModel | null> {
		return await this.getByIdRaw(fileId);
	}

	override async getAll(): Promise<FileModel[]> {
		try {
			return await this.prisma.file.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: FileCreateInput): Promise<FileModel> {
		try {
			return await this.prisma.file.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		fileId: UUID,
		data: FileUpdateInput,
	): Promise<FileModel> {
		try {
			return await this.prisma.file.update({
				where: {
					FileId: fileId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(fileId, e);
		}
	}
}
