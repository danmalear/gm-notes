import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type Action } from './Action.ts';

export class ActionRepository extends Repository<Action, Action> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<Action | undefined> {
		return await this.getByIdRaw(id);
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
