import type { RegionCreate, RegionResponse, Shape } from '#dtos/region.ts';
import type { UUID } from 'crypto';
import type { Region } from '../data/MapData.ts';
import {
	isRectangle,
	isRectangleEqual,
	type ShapeType,
} from '../helpers/shapes.ts';

export interface RegionState {
	region?: RegionResponse | RegionCreate | Region;
	isEditingRegion: boolean;
	revertRegion?: RegionResponse | Region;
	regionId?: string; // @TODO make this UUID
	revertRegionId?: string;
	regionShape?: Shape;
	revertShape?: Shape;
	newShapeType?: ShapeType;
}

interface ChangedRegionAction {
	type: 'changed_region';
	region: RegionResponse | Region;
	regionId: string; // @TODO make this UUID
}

interface DeselectedRegionAction {
	type: 'deselected_region';
}

interface AddedRegionAction {
	type: 'added_region';
	mapId: UUID;
}

interface FinishedEditingRegionShapesAction {
	type: 'finished_editing_region_shapes';
}

interface AddedRegionShapeAction {
	type: 'added_region_shape';
	shapeType: ShapeType;
}

interface SelectedRegionShapeAction {
	type: 'selected_region_shape';
	shape: Shape;
}

interface UpdatedRegionShapeAction {
	type: 'updated_region_shape';
	shape: Shape;
}

interface CanceledRegionShapeAction {
	type: 'canceled_region_shape';
}

interface DeletedRegionShapeAction {
	type: 'deleted_region_shape';
}

interface FinishedEditingRegionShapeAction {
	type: 'finished_editing_region_shape';
}

export type RegionAction =
	| ChangedRegionAction
	| DeselectedRegionAction
	| AddedRegionAction
	| FinishedEditingRegionShapesAction
	| AddedRegionShapeAction
	| SelectedRegionShapeAction
	| UpdatedRegionShapeAction
	| CanceledRegionShapeAction
	| DeletedRegionShapeAction
	| FinishedEditingRegionShapeAction;

type RegionReducer = (
	regionState: RegionState,
	action: RegionAction,
) => RegionState;

// @TODO remove this dependency
export const isHardCoded = (
	region: RegionResponse | RegionCreate | Region,
): region is Region => {
	return 'code' in region;
};

export const isExisting = (
	region: RegionResponse | RegionCreate | Region,
): region is RegionResponse => {
	return 'id' in region;
};

const regionReducer: RegionReducer = (regionState, action) => {
	switch (action.type) {
		case 'changed_region':
			console.log('changed_region called');
			return {
				region: action.region,
				isEditingRegion: false,
				revertRegion: action.region,
				regionId: action.regionId,
				revertRegionId: action.regionId,
			};
		case 'deselected_region':
			console.log('deselected_region called');
			return {
				isEditingRegion: false,
			};
		case 'added_region':
			console.log('added_region called');
			return {
				region: {
					mapId: action.mapId,
					name: 'New Region',
					shapes: [],
				},
				isEditingRegion: true,
				revertRegion: regionState.revertRegion,
				revertRegionId: regionState.revertRegionId,
			};
		case 'finished_editing_region_shapes':
			if (!regionState.region) {
				throw Error(
					'Attempt to finish editing region shapes outside the context of editing region shapes',
				);
			}

			// @TODO save changes to DB
			return {
				region: regionState.revertRegion,
				isEditingRegion: false,
				regionId: regionState.revertRegionId,
			};
		case 'added_region_shape':
			return {
				...regionState,
				regionShape: undefined,
				revertShape: undefined,
				newShapeType: action.shapeType,
			};
		case 'updated_region_shape':
			return {
				...regionState,
				regionShape: action.shape,
			};
		case 'canceled_region_shape':
			if (
				!regionState.region ||
				isHardCoded(regionState.region) ||
				!regionState.regionShape
			) {
				throw Error(
					'Attempt to cancel region shape outside the context of editing a region shape',
				);
			}
			if (isRectangle(regionState.regionShape)) {
				if (regionState.revertShape && !isRectangle(regionState.revertShape)) {
					throw Error('Invalid UID state');
				}
				return {
					...regionState,
					region: {
						...regionState.region,
						shapes: regionState.revertShape
							? [...regionState.region.shapes, regionState.revertShape]
							: regionState.region.shapes,
					},
					regionShape: undefined,
					revertShape: undefined,
					newShapeType: undefined,
				};
			}
			throw Error('Invalid shape');
		case 'deleted_region_shape':
			return {
				...regionState,
				newShapeType: undefined,
				regionShape: undefined,
				revertShape: undefined,
			};
		case 'finished_editing_region_shape':
			if (
				!regionState.region ||
				isHardCoded(regionState.region) ||
				!regionState.regionShape
			) {
				throw Error(
					'Attempt to finish editing region shape outside the context of editing a region shape',
				);
			}
			if (isRectangle(regionState.regionShape)) {
				return {
					...regionState,
					region: {
						...regionState.region,
						shapes: [...regionState.region.shapes, regionState.regionShape],
					},
					regionShape: undefined,
					revertShape: undefined,
				};
			}

			throw Error('Invalid shape');
		case 'selected_region_shape':
			if (!regionState.region || isHardCoded(regionState.region))
				throw Error(
					'Attempt to select region shape outside the context of editing a region',
				);
			if (isRectangle(action.shape)) {
				const actionRect = action.shape;
				const existingShape = regionState.region.shapes.find(
					(rect) => isRectangle(rect) && isRectangleEqual(rect, actionRect),
				);
				return {
					...regionState,
					region: {
						...regionState.region,
						shapes: regionState.region.shapes.filter(
							(rect) =>
								!isRectangle(rect) || !isRectangleEqual(rect, actionRect),
						),
					},
					newShapeType: undefined,
					regionShape: action.shape,
					revertShape: existingShape,
				};
			}
			throw Error('Invalid shape');
		default:
			throw Error('Invalid region reducer action specified');
	}
};

export default regionReducer;
