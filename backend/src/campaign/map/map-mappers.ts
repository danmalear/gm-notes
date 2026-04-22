import { buildShapes } from '#region/region-shape-utils.ts';
import type { MapResponse, MapStub } from './map-dtos.ts';
import type { Map, MapRaw } from './Map.ts';

export function toDto(map: Map) {
	const mapResponse: MapResponse = {
		id: map.MapId,
		name: map.Name,
		imagePath: map.ImagePath,
		defaultLighting: map.DefaultLighting,
		width: map.Width,
		height: map.Height,
		// @TODO region mapper
		regions: map.Regions.map((region) => ({
			id: region.RegionId,
			mapId: region.MapId,
			name: region.Name,
			// @TODO region shape mapper
			shapes: buildShapes(region.Shapes),
		})),
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
