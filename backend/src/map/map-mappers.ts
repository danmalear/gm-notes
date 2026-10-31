import { toStub as regionToStub } from '#region/region-mappers.ts';
import type { UUID } from 'node:crypto';
import type { MapResponse, MapStub } from './map-dtos.ts';
import type { MapFull, MapMin } from './map-repository.ts';

export function toDto(map: MapFull) {
	const mapResponse: MapResponse = {
		id: map.MapId as UUID,
		campaignId: map.CampaignId as UUID,
		name: map.Name,
		imagePath: map.ImageFileId,
		defaultLighting: map.DefaultLighting,
		width: map.Width,
		height: map.Height,
		regions: map.Regions.map(regionToStub),
	};

	return mapResponse;
}

export function toStub(map: MapMin) {
	const mapStub: MapStub = {
		id: map.MapId as UUID,
		campaignId: map.CampaignId as UUID,
		name: map.Name,
		imagePath: map.ImageFileId,
	};

	return mapStub;
}
