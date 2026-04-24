import type { RegionRawWithShapes } from '#region/Region.ts';
import type { Lighting } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'Map';
export const pkColumn = 'MapId';

export interface MapRaw {
	MapId: UUID;
	CampaignId: UUID;
	MapTemplateId: UUID | null;
	Name: string;
	ImagePath: string;
	DefaultLighting: Lighting;
	Width: number;
	Height: number;
}

export interface Map extends MapRaw {
	Regions: RegionRawWithShapes[];
}
