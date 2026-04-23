import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type RegionShape } from './RegionShape.ts';

export class RegionShapeRepository extends Repository<
	RegionShape,
	RegionShape
> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<RegionShape | undefined> {
		return await this.getByIdRaw(id);
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
