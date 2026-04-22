import type { MapRaw } from '#map/Map.ts';
import type { UUID } from 'crypto';

export const tableName = 'Campaign';
export const pkColumn = 'CampaignId';

export interface CampaignRaw {
	CampaignId: UUID;
	CampaignTemplateId: UUID | null;
	Name: string;
	ActiveMapId: UUID | null;
}

export interface Campaign extends CampaignRaw {
	Maps: MapRaw[];
}
