import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type ItemRaw } from './Item.ts';
import {
	itemIdColName,
	locationIdColName,
	tableName as locationJoinTableName,
	type LocationItemRaw,
} from './LocationItem.ts';

export class ItemRepository extends Repository<ItemRaw, ItemRaw> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<ItemRaw | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves item records from the database for a given location ID
	 * @param id UUID of the location to get items for
	 * @returns The list of items (empty array if none found)
	 */
	async getByLocationId(locationId: UUID) {
		try {
			return await db<ItemRaw>(this.tableName)
				.innerJoin<LocationItemRaw>(
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
