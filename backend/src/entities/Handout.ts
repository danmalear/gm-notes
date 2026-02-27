import type { UUID } from 'crypto';

export const tableName = 'Handout';
export const pkColumn = 'HandoutId';

export type HandoutType = 'Text' | 'Image' | 'File';

export interface Handout {
	HandoutId: UUID;
	CampaignId: UUID;
	Name: string;
	Type: HandoutType;
	Source: string;
}
