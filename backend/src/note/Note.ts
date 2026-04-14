import type { UUID } from 'crypto';

export const tableName = 'Note';
export const pkColumn = 'NoteId';

export interface Note {
	NoteId: UUID;
	EntityId: UUID;
	Description: string;
}
