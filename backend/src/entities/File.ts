import type { UUID } from 'crypto';

export const tableName = 'File';
export const pkColumn = 'FileId';

export interface File {
	FileId: UUID;
	FileName: string;
}
