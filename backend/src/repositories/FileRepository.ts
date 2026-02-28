import { pkColumn, tableName, type File } from '../entities/File.ts';
import { Repository } from './Repository.ts';

export class FileRepository extends Repository<File> {
	constructor() {
		super(tableName, pkColumn);
	}

	async getById(id: string) {
		// @ts-expect-error This is a rare case of the ID column not being in UUID format
		return await super.getById(id);
	}
}
