import type { UUID } from 'crypto';

export const tableName = 'Campaign';
export const pkColumn = 'CampaignId';

export interface CampaignRaw {
	CampaignId: UUID;
	CampaignTemplateId: UUID | null;
	Name: string;
	ActiveMapId: UUID | null;
}
