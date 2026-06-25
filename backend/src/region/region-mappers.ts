import { toStub as actionToStub } from '#action/action-mappers.ts';
import { toStub as handoutToStub } from '#handout/handout-mappers.ts';
import { toStub as locationItemToStub } from '#item/location-item-mappers.ts';
import { toStub as narrationToStub } from '#narration/narration-mappers.ts';
import type { RegionShapeModel } from '#prisma-models/RegionShape.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from '#region/shape-validators.ts';
import { mapRelativeLightingToDto } from '#shared/enum-mappers.ts';
import type { UUID } from 'node:crypto';
import type { RegionResponse, RegionStub, Shape } from './region-dtos.ts';
import type {
	RegionIncludeAll,
	RegionIncludeMin,
	RegionModel,
} from './region-repository.ts';

export function shapeToStub(shape: RegionShapeModel): Shape {
	const coords = shape.Coords;
	switch (shape.ShapeType) {
		case 'Circle':
			validateCircle(coords);
			return coords;
		case 'Rectangle':
			validateRectangle(coords);
			return coords;
		case 'Polygon':
			validatePolygon(coords);
			return coords;
		default:
			throw Error('Invalid shape stored on region');
	}
}

export function toDto(region: RegionIncludeAll) {
	const regionResponse: RegionResponse = {
		id: region.RegionId as UUID,
		mapId: region.MapId as UUID,
		name: region.Name,
		shapes: region.Shapes.map(shapeToStub),
		lighting: mapRelativeLightingToDto(region.Lighting),
		narrations: region.Narrations.map(narrationToStub),
		actions: region.Actions.map(actionToStub),
		items: region.Items.map(locationItemToStub),
		handouts: region.Handouts.map(handoutToStub),
		notes: region.Notes.map((note) => note.Description),
	};

	return regionResponse;
}

export function toStub(region: RegionModel) {
	const regionStub: RegionStub = {
		id: region.RegionId,
		mapId: region.MapId,
		name: region.Name,
	};

	return regionStub;
}

export function toStubWithShapes(region: RegionIncludeMin) {
	const regionStub: RegionStubWithShapes = {
		id: region.RegionId,
		mapId: region.MapId,
		name: region.Name,
		shapes: region.Shapes.map(shapeToStub),
	};

	return regionStub;
}
