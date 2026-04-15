import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { db } from '../../db.ts';
import { pkColumn, tableName, type AbilityCheck } from './AbilityCheck.ts';

export class AbilityCheckRepository extends Repository<AbilityCheck> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves ability check records from the database for a given action ID
	 * @param id UUID of the action to get ability checks for
	 * @returns The list of ability checks (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			return await db<AbilityCheck>(tableName).where('ActionId', actionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
