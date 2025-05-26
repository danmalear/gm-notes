import type { UUID } from 'crypto';

export const tableName = 'MapTemplate';
export const pkColumn = 'MapTemplateId';

export interface MapTemplate {
	// Properties
	MapTemplateId: UUID;
	CampaignTemplateId: UUID | null;
	Name: string;
	ImagePath: string;
}
