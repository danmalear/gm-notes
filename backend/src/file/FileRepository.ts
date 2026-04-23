import { Repository } from '#shared/Repository.ts';
import { pkColumn, tableName, type File } from './File.ts';

export class FileRepository extends Repository<File> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: string): Promise<File | undefined> {
		// @ts-expect-error This is a rare case of the ID column not being in UUID format
		return await this.getByIdRaw(id);
	}
}
