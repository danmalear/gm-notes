import type { MapResponse } from '#dtos/map.ts';

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
