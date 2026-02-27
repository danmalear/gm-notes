import type { UUID } from 'crypto';

export const tableName = 'Handout';
export const pkColumn = 'HandoutId';

export interface Handout {
	HandoutId: UUID;
	CampaignId: UUID;
	Name: string;
	Type: string;
	Source: string;
}
