import type { UUID } from 'crypto';

export const tableName = 'Narration';
export const pkColumn = 'NarrationId';

export interface Narration {
	NarrationId: UUID;
	NarrationTemplateId: UUID | null;
	Name: string;
	Description: string;
	IsRead: boolean;
}
