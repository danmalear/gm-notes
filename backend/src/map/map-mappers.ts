import type { MapModel } from '#prisma-models/Map.ts';
import { toStub as regionToStub } from '#region/region-mappers.ts';
import { mapAbsoluteLightingToDto } from '#shared/enum-mappers.ts';
import type { UUID } from 'node:crypto';
import type { MapResponse, MapStub } from './map-dtos.ts';
import type { MapIncludeAll } from './map-repository.ts';

export function toDto(map: MapIncludeAll) {
	const mapResponse: MapResponse = {
		id: map.MapId as UUID,
		campaignId: map.CampaignId as UUID,
		name: map.Name,
		imagePath: map.ImageFileId,
		defaultLighting: mapAbsoluteLightingToDto(map.DefaultLighting),
		width: map.Width,
		height: map.Height,
		regions: map.Regions.map(regionToStub),
	};

	return mapResponse;
}

export function toStub(map: MapModel) {
	const mapStub: MapStub = {
		id: map.MapId as UUID,
		campaignId: map.CampaignId as UUID,
		name: map.Name,
		imagePath: map.ImageFileId,
	};

	return mapStub;
}
