import { Repository } from '#shared/repository-old.ts';
import type { UUID } from 'crypto';

export interface CommandRec {
	CommandId: UUID;
	StreamId: UUID | null;
	CorrelationId: UUID;
	Context: string;
	Ref: string;
	Data: object;
	CreatedAt: string;
}

export const tableName = 'es_Command';
export const pkColumn = 'CommandId';

export class CommandRepository extends Repository<CommandRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<CommandRec | undefined> {
		return await this.getByIdRaw(id);
	}
}
