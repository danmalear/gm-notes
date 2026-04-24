import type { ActionStub } from '#action/action-dtos.ts';
import type { HandoutStub } from '#handout/handout-dtos.ts';
import type { LocationItemStub } from '#item/item-dtos.ts';
import type { NarrationStub } from '#narration/narration-dtos.ts';
import type { RelativeLighting } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export interface Rectangle {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface Circle {
	x: number;
	y: number;
	r: number;
}

export interface Coords {
	x: number;
	y: number;
}

export interface Polygon {
	coords: Coords[];
}

export type Shape = Rectangle | Circle | Polygon;

export interface RegionCreate {
	name: string;
	mapId: UUID;
	shapes: Shape[];
	// @TODO Some of these might be their own files
	// lighting: RelativeLighting;
	// narrations: NarrationStub[];
	// creatures: Creature[];
	// actions: ActionStub[];
	// items: LocationItemStub[];
	// opportunities: string[];
	// handouts: HandoutStub[];
	// notes: string[];
}

export interface RegionQueryParams {
	mapId?: UUID;
}

export interface RegionResponse {
	id: UUID;
	mapId: UUID;
	name: string;
	shapes: Shape[];
	lighting: RelativeLighting;
	narrations: NarrationStub[];
	// @TODO Some of these might be their own files
	// creatures?: Creature[];
	actions: ActionStub[];
	items: LocationItemStub[];
	// opportunities?: string[];
	handouts: HandoutStub[];
	notes: string[];
}

export interface RegionStub {
	id: UUID;
	mapId: UUID;
	name: string;
}

export interface RegionStubWithShapes extends RegionStub {
	shapes: Shape[];
}
