import type { UUID } from 'crypto';

export const tableName = 'CampaignTemplate';
export const pkColumn = 'CampaignTemplateId';

export interface CampaignTemplate {
	CampaignTemplateId: UUID;
	Name: string;
}
