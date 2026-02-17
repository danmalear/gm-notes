import type { UUID } from 'crypto';
import { db } from '../db.ts';
import {
	type Region,
	type RegionWithShapes,
	pkColumn,
	tableName,
} from '../entities/Region.ts';
import { getMessage } from '../helpers/error.ts';
import { RegionShapeRepository } from './RegionShapeRepository.ts';
import { Repository } from './Repository.ts';

export class RegionRepository extends Repository<Region> {
	regionShapeRepository: RegionShapeRepository;

	constructor() {
		super(tableName, pkColumn);
		this.regionShapeRepository = new RegionShapeRepository();
	}

	async addShapes(region: Region) {
		const shapes = await this.regionShapeRepository.getByRegionId(
			region.RegionId,
		);
		const regionWithShapes: RegionWithShapes = {
			...region,
			RegionShapes: shapes,
		};

		return regionWithShapes;
	}

	async getById(id: UUID) {
		const region = await super.getById(id);
		if (!region) return undefined;

		return await this.addShapes(region);
	}

	async getAll() {
		const regions = await super.getAll();

		const regionsWithShapes: RegionWithShapes[] = [];
		for (const region of regions) {
			regionsWithShapes.push(await this.addShapes(region));
		}

		return regionsWithShapes;
	}

	/**
	 * Retrieves region records from the database for a given map ID
	 * @param mapId UUID of the map to get regions for
	 * @returns The list of regions (empty array if none found)
	 */
	async getByMapId(mapId: UUID) {
		try {
			const regions = await db<Region>(this.tableName).where('MapId', mapId);

			const regionsWithShapes: RegionWithShapes[] = [];
			for (const region of regions) {
				regionsWithShapes.push(await this.addShapes(region));
			}
			return regionsWithShapes;
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for map ID ${mapId}: ${getMessage(e)}`,
			);
		}
	}
}
