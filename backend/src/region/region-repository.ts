import type { ActionRec, ActionRepository } from '#action/action-repository.ts';
import type {
	HandoutRec,
	HandoutRepository,
} from '#handout/handout-repository.ts';
import type { ItemRec } from '#item/item-repository.ts';
import type {
	LocationItemRec,
	LocationItemRepository,
} from '#item/location-item-repository.ts';
import type { NarrationRepository } from '#narration/narration-repository.ts';
import type { NoteRec, NoteRepository } from '#note/note-repository.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import type { RelativeLighting } from '#shared/data-types.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/repository-old.ts';
import type { UUID } from 'crypto';
import type {
	RegionShapeRec,
	RegionShapeRepository,
} from './region-shape-repository.ts';

export interface RegionRec {
	RegionId: UUID;
	RegionTemplateId: UUID | null;
	MapId: UUID;
	Name: string;
	Lighting: RelativeLighting;
}

export interface RegionRecShapes extends RegionRec {
	Shapes: RegionShapeRec[];
}

export interface RegionRefRec extends RegionRecShapes {
	Lighting: RelativeLighting;
	Narrations: NarrationModel[];
	// Creatures: CreatureRec[];
	Actions: ActionRec[];
	Items: (ItemRec & LocationItemRec)[];
	Handouts: HandoutRec[];
	Notes: NoteRec[];
}

export const tableName = 'Region';
export const pkColumn = 'RegionId';

export interface RegionRepositoryConfig {
	actionRepository: ActionRepository;
	// creatureRepository: CreatureRepository;
	handoutRepository: HandoutRepository;
	locationItemRepository: LocationItemRepository;
	narrationRepository: NarrationRepository;
	noteRepository: NoteRepository;
	regionShapeRepository: RegionShapeRepository;
}

export class RegionRepository extends Repository<RegionRec, RegionRefRec> {
	actionRepository: ActionRepository;
	// creatureRepository: CreatureRepository;
	handoutRepository: HandoutRepository;
	locationItemRepository: LocationItemRepository;
	narrationRepository: NarrationRepository;
	noteRepository: NoteRepository;
	regionShapeRepository: RegionShapeRepository;

	constructor({
		actionRepository,
		// creatureRepository,
		handoutRepository,
		locationItemRepository,
		narrationRepository,
		noteRepository,
		regionShapeRepository,
	}: RegionRepositoryConfig) {
		super(tableName, pkColumn);
		this.actionRepository = actionRepository;
		// this.creatureRepository = creatureRepository;
		this.handoutRepository = handoutRepository;
		this.locationItemRepository = locationItemRepository;
		this.narrationRepository = narrationRepository;
		this.noteRepository = noteRepository;
		this.regionShapeRepository = regionShapeRepository;
	}

	override async getById(id: UUID): Promise<RegionRefRec | undefined> {
		const regionRaw = await this.getByIdRaw(id);
		if (!regionRaw) return undefined;

		const narrations = await this.narrationRepository.getByRegionId(id);
		// const creatures = await this.creatureRepository.getByLocationId(id);
		const shapes = await this.regionShapeRepository.getByRegionId(id);
		const actions = await this.actionRepository.getByTargetId(id);
		const items = await this.locationItemRepository.getByLocationId(id);
		const handouts = await this.handoutRepository.getByRegionId(id);
		const notes = await this.noteRepository.getByEntityId(id);

		return {
			...regionRaw,
			Narrations: narrations,
			// Creatures: creatures,
			Shapes: shapes,
			Actions: actions,
			Items: items,
			Handouts: handouts,
			Notes: notes,
		};
	}

	/**
	 * Retrieves region records from the database for a given map ID
	 * @param mapId UUID of the map to get regions for
	 * @returns The list of regions (empty array if none found)
	 */
	async getByMapId(mapId: UUID) {
		try {
			return await db<RegionRec>(this.tableName).where('MapId', mapId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for map ID ${mapId}: ${getMessage(e)}`,
			);
		}
	}
}
