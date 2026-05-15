import { Repository } from '#shared/Repository.ts';

export interface FileRec {
	FileId: string;
	FileName: string;
}

export const tableName = 'File';
export const pkColumn = 'FileId';

export class FileRepository extends Repository<FileRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: string): Promise<FileRec | undefined> {
		// @ts-expect-error This is a rare case of the ID column not being in UUID format
		return await this.getByIdRaw(id);
	}
}
