import type { UUID } from 'crypto';
import { db } from '../db.ts';
import {
	pkColumn,
	tableName,
	type Description,
} from '../entities/Description.ts';
import { getMessage } from '../helpers/error.ts';
import { Repository } from './Repository.ts';

export class DescriptionRepository extends Repository<Description> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves description records from the database for a given parent ID
	 * @param id UUID of the parent to get descriptions for
	 * @returns The list of descriptions (empty array if none found)
	 */
	async getByParentId(parentId: UUID) {
		try {
			return await db<Description>(this.tableName).where('ParentId', parentId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for object ID ${parentId}: ${getMessage(e)}`,
			);
		}
	}
}
