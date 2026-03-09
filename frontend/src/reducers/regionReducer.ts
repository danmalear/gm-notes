import type { RegionCreate, RegionResponse } from '#dtos/region.ts';
import type { Region } from '../data/MapData.ts';

export interface RegionState {
	region?: RegionResponse | RegionCreate | Region;
	regionId?: string; // @TODO make this UUID
}

interface LoadedRegionAction {
	type: 'loaded_region';
	region: RegionResponse | RegionCreate | Region;
	regionId: string; // @TODO make this UUID
}

export type RegionAction = LoadedRegionAction;

type RegionReducer = (
	regionState: RegionState,
	action: RegionAction,
) => RegionState;

const regionReducer: RegionReducer = (_regionState, action) => {
	switch (action.type) {
		case 'loaded_region':
			return {
				region: action.region,
				regionId: action.regionId,
			};
	}
};

export default regionReducer;
