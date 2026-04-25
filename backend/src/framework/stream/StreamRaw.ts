import type { UUID } from 'crypto';

export const tableName = 'es_Stream';
export const pkColumn = 'StreamId';

export interface StreamRaw {
	StreamId: UUID;
	Type: string;
	Version: number;
	CreatedAt: string;
	UpdatedAt: string;
}
