import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface StreamRec {
	StreamId: UUID;
	Type: string;
	Version: number;
	CreatedAt: string;
	UpdatedAt: string;
}

export const tableName = 'es_Stream';
export const pkColumn = 'StreamId';

export class StreamRepository extends Repository<StreamRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<StreamRec | undefined> {
		return await this.getByIdRaw(id);
	}
}
