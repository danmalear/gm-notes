import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { db } from '../db.ts';
import { getMessage } from '../helpers/error.ts';
import { pkColumn, tableName, type Action } from './Action.ts';

export class ActionRepository extends Repository<Action> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves action records from the database for a given target ID
	 * @param id UUID of the target to get actions for
	 * @returns The list of actions (empty array if none found)
	 */
	async getByTargetId(targetId: UUID) {
		try {
			return await db<Action>(tableName).where('TargetId', targetId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for target ID ${targetId}: ${getMessage(e)}`,
			);
		}
	}
}
