import type { UUID } from 'crypto';
import { db } from '../../../db.ts';
import { getMessage } from '../../../helpers/error.ts';
import { Repository } from '../../../repositories/Repository.ts';
import { type Region, pkColumn, tableName } from './Region.ts';

export class RegionRepository extends Repository<Region> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves region records from the database for a given map ID
	 * @param mapId UUID of the map to get regions for
	 * @returns The list of regions (empty array if none found)
	 */
	async getByMapId(mapId: UUID) {
		try {
			return await db<Region>(this.tableName).where('MapId', mapId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for map ID ${mapId}: ${getMessage(e)}`,
			);
		}
	}
}
