import type { UUID } from 'crypto';
import type { Lighting } from './data-types.ts';

export const tableName = 'Map';
export const pkColumn = 'MapId';

export interface Map {
	MapId: UUID;
	CampaignId: UUID;
	MapTemplateId: UUID | null;
	Name: string;
	ImagePath: string;
	DefaultLighting: Lighting;
	Width: number;
	Height: number;
}
