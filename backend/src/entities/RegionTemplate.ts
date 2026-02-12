import type { UUID } from 'crypto';

export const tableName = 'RegionTemplate';
export const pkColumn = 'RegionTemplateId';

export interface RegionTemplate {
	RegionTemplateId: UUID;
	MapTemplateId: UUID | null;
	Name: string;
}
