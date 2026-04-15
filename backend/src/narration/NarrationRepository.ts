import {
	narrationIdColName,
	regionIdColName,
	tableName as regionJoinTableName,
	type RegionNarration,
} from '#region/RegionNarration.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { db } from '../db.ts';
import { pkColumn, tableName, type Narration } from './Narration.ts';

export class NarrationRepository extends Repository<Narration> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves narration records from the database for a given region ID
	 * @param id UUID of the region to get narrations for
	 * @returns The list of narrations (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await db<Narration>(this.tableName)
				.innerJoin<RegionNarration>(
					regionJoinTableName,
					`${regionJoinTableName}.${narrationIdColName}`,
					`${this.tableName}.${this.pkColumn}`,
				)
				.where(`${regionJoinTableName}.${regionIdColName}`, regionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
