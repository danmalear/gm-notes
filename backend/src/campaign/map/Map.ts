import type { Region } from '#region/Region.ts';
import type { RegionShape } from '#region/RegionShape.ts';
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

// @TODO implement in region module
export type TempRegion = Region & { Shapes: RegionShape[] };

export interface Map extends MapRaw {
	Regions: TempRegion[];
}
