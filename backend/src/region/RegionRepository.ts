import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type RegionRaw } from './Region.ts';

export class RegionRepository extends Repository<RegionRaw, RegionRaw> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<RegionRaw | undefined> {
		return await this.getByIdRaw(id);
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
