import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type Command } from './Command.ts';

export class CommandRepository extends Repository<Command> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<Command | undefined> {
		return await this.getByIdRaw(id);
	}
}
