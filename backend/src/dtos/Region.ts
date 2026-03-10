import type { UUID } from 'crypto';
import type { ActionStub } from './action.ts';
import type { RelativeLighting } from './data-types.ts';
import type { HandoutStub } from './handout.ts';
import type { LocationItemStub } from './item.ts';
import type { MapStub } from './map.ts';
import type { NarrationStub } from './narration.ts';
import type { RegionTemplateStub } from './region-template.ts';

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
	name: string;
	regionTemplate?: RegionTemplateStub;
	map: MapStub;
	shapes: Shape[];
	lighting: RelativeLighting;
	narrations: NarrationStub[];
	// @TODO Some of these might be their own files
	// creatures?: Creature[];
	actions: ActionStub[];
	items: LocationItemStub[];
	// opportunities?: string[];
	handouts: HandoutStub[];
	// notes?: string[];
}

export interface RegionStub {
	id: UUID;
	regionTemplateId?: UUID;
	mapId: UUID;
	name: string;
	shapes: Shape[];
}
