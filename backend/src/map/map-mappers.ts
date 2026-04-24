import { toStub as regionToStub } from '#region/region-mappers.ts';
import type { MapResponse, MapStub } from './map-dtos.ts';
import type { Map, MapRaw } from './Map.ts';

export function toDto(map: Map) {
	const mapResponse: MapResponse = {
		id: map.MapId,
		campaignId: map.CampaignId,
		name: map.Name,
		imagePath: map.ImagePath,
		defaultLighting: map.DefaultLighting,
		width: map.Width,
		height: map.Height,
		regions: map.Regions.map(regionToStub),
	};

	return mapResponse;
}

export function toStub(map: MapRaw) {
	const mapStub: MapStub = {
		id: map.MapId,
		campaignId: map.CampaignId,
		name: map.Name,
		imagePath: map.ImagePath,
	};

	return mapStub;
}
