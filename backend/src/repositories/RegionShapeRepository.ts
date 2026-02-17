import type { UUID } from 'crypto';
import { db } from '../db.ts';
import { RegionShape, pkColumn, tableName } from '../entities/RegionShape.ts';
import { getMessage } from '../helpers/error.ts';
import { Repository } from './Repository.ts';

export class RegionShapeRepository extends Repository<RegionShape> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves region shape records from the database for a given region ID
	 * @param regionId UUID of the region to get shapes for
	 * @returns The list of region shapes (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await db<RegionShape>(this.tableName).where('RegionId', regionId);
		} catch (e) {
			throw Error(
				`Error getting shape records for region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
