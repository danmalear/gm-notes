import type { ActionRaw } from '#action/Action.ts';
import type { Handout } from '#handout/Handout.ts';
import type { ItemRaw } from '#item/Item.ts';
import type { LocationItemRaw } from '#item/LocationItem.ts';
import type { Narration } from '#narration/Narration.ts';
import type { Note } from '#note/Note.ts';
import type { RelativeLighting } from '#shared/data-types.ts';
import type { UUID } from 'crypto';
import type { RegionShape } from './RegionShape.ts';

export const tableName = 'Region';
export const pkColumn = 'RegionId';

export interface RegionRaw {
	RegionId: UUID;
	RegionTemplateId: UUID | null;
	MapId: UUID;
	Name: string;
	Lighting: RelativeLighting;
}

export interface RegionRawWithShapes extends RegionRaw {
	Shapes: RegionShape[];
}

export interface Region extends RegionRawWithShapes {
	Lighting: RelativeLighting;
	Narrations: Narration[];
	// Creatures: Creature[];
	Actions: ActionRaw[];
	Items: (ItemRaw & LocationItemRaw)[];
	Handouts: Handout[];
	Notes: Note[];
}
