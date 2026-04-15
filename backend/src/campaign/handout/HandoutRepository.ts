import {
	handoutIdColName,
	regionIdColName,
	tableName as regionJoinTableName,
	type RegionHandout,
} from '#region/RegionHandout.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { db } from '../../db.ts';
import { getMessage } from '../../helpers/error.ts';
import { pkColumn, tableName, type Handout } from './Handout.ts';

export class HandoutRepository extends Repository<Handout> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves handout records from the database for a given region ID
	 * @param id UUID of the region to get handouts for
	 * @returns The list of handouts (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await db<Handout>(this.tableName)
				.innerJoin<RegionHandout>(
					regionJoinTableName,
					`${regionJoinTableName}.${handoutIdColName}`,
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
