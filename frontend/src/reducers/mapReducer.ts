import type { MapResponse } from '#dtos/map.ts';
import type { RegionResponse } from '#dtos/region.ts';

export interface Transform {
	scale: number;
	translation: {
		x: number;
		y: number;
	};
}

export interface MapState {
	map: MapResponse;
	transform: Transform;
	imgWidth?: number;
	imgHeight?: number;
}

interface ChangedMapAction {
	type: 'changed_map';
	map: MapResponse;
}

interface UpdatedMapAction {
	type: 'updated_map';
	map: MapResponse;
}

interface CreatedRegionAction {
	type: 'created_region';
	region: RegionResponse;
}

interface ChangedTransformAction {
	type: 'updated_transform';
	transform: Transform;
}

interface LoadedImageAction {
	type: 'loaded_image';
	width: number;
	height: number;
}

export type MapAction =
	| ChangedMapAction
	| UpdatedMapAction
	| CreatedRegionAction
	| ChangedTransformAction
	| LoadedImageAction;

type MapReducer = (mapState: MapState, action: MapAction) => MapState;

const mapReducer: MapReducer = (mapState, action) => {
	switch (action.type) {
		case 'changed_map':
			return {
				map: action.map,
				transform: {
					scale: 1,
					translation: { x: 0, y: 0 },
				},
			};
		case 'updated_map':
			return {
				...mapState,
				map: action.map,
			};
		case 'created_region':
			return {
				...mapState,
				map: {
					...mapState.map,
					regions: [
						...mapState.map.regions,
						{
							id: action.region.id,
							mapId: mapState.map.id,
							name: action.region.name,
							shapes: action.region.shapes,
							regionTemplateId: action.region.regionTemplate?.id,
						},
					],
				},
			};
		case 'updated_transform':
			return {
				...mapState,
				transform: action.transform,
			};
		case 'loaded_image':
			return {
				...mapState,
				imgWidth: action.width,
				imgHeight: action.height,
			};
		default:
			throw Error('Invalid map reducer action specified');
	}
};

export default mapReducer;
