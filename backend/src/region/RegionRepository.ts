import type { ActionRepository } from '#action/ActionRepository.ts';
import type { HandoutRepository } from '#handout/HandoutRepository.ts';
import type { LocationItemRepository } from '#item/LocationItemRepository.ts';
import type { NarrationRepository } from '#narration/NarrationRepository.ts';
import type { NoteRepository } from '#note/NoteRepository.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type Region, type RegionRaw } from './Region.ts';
import type { RegionShapeRepository } from './RegionShapeRepository.ts';

export class RegionRepository extends Repository<RegionRaw, Region> {
	actionRepository: ActionRepository;
	// creatureRepository: CreatureRepository;
	handoutRepository: HandoutRepository;
	locationItemRepository: LocationItemRepository;
	narrationRepository: NarrationRepository;
	noteRepository: NoteRepository;
	regionShapeRepository: RegionShapeRepository;

	constructor(
		actionRepository: ActionRepository,
		// creatureRepository: CreatureRepository,
		handoutRepository: HandoutRepository,
		locationItemRepository: LocationItemRepository,
		narrationRepository: NarrationRepository,
		noteRepository: NoteRepository,
		regionShapeRepository: RegionShapeRepository,
	) {
		super(tableName, pkColumn);
		this.actionRepository = actionRepository;
		// this.creatureRepository = creatureRepository;
		this.handoutRepository = handoutRepository;
		this.locationItemRepository = locationItemRepository;
		this.narrationRepository = narrationRepository;
		this.noteRepository = noteRepository;
		this.regionShapeRepository = regionShapeRepository;
	}

	override async getById(id: UUID): Promise<Region | undefined> {
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
			return await db<RegionRaw>(this.tableName).where('MapId', mapId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for map ID ${mapId}: ${getMessage(e)}`,
			);
		}
	}
}
