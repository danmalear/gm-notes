import { pkColumn, tableName, type File } from '../entities/File';
import { Repository } from './Repository.ts';

export class FileRepository extends Repository<File> {
	constructor() {
		super(tableName, pkColumn);
	}
}
