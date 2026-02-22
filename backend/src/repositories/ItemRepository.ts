import type { UUID } from 'crypto';
import { db } from '../db.ts';
import { pkColumn, tableName, type Item } from '../entities/Item.ts';
import {
	itemIdColName,
	locationIdColName,
	tableName as locationJoinTableName,
	type LocationItem,
} from '../entities/LocationItem.ts';
import { getMessage } from '../helpers/error.ts';
import { Repository } from './Repository.ts';

export class ItemRepository extends Repository<Item> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves item records from the database for a given location ID
	 * @param id UUID of the location to get items for
	 * @returns The list of items (empty array if none found)
	 */
	async getByLocationId(locationId: UUID) {
		try {
			return await db<Item>(this.tableName)
				.innerJoin<LocationItem>(
					locationJoinTableName,
					`${locationJoinTableName}.${itemIdColName}`,
					`${this.tableName}.${this.pkColumn}`,
				)
				.where(`${locationJoinTableName}.${locationIdColName}`, locationId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for location ID ${locationId}: ${getMessage(e)}`,
			);
		}
	}
}
