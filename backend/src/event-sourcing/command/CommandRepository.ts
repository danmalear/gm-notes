import { Repository } from '#shared/Repository.ts';
import { type Command, pkColumn, tableName } from './Command.ts';

export class CommandRepository extends Repository<Command> {
	constructor() {
		super(tableName, pkColumn);
	}
}
