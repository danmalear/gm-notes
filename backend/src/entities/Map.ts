import type { UUID } from 'crypto';

export const tableName = 'Map';
export const pkColumn = 'MapId';

export interface Map {
	// Properties
	MapId: UUID;
	CampaignId: UUID;
	MapTemplateId: UUID | null;
	Name: string;
	ImagePath: string;
}
