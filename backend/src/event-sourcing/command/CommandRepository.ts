import { Repository } from '../../repositories/Repository.ts';
import { type Command, pkColumn, tableName } from './Command.ts';

export class CommandRepository extends Repository<Command> {
	constructor() {
		super(tableName, pkColumn);
	}
}
