import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type AbilityCheckRaw } from './AbilityCheck.ts';

export class AbilityCheckRepository extends Repository<
	AbilityCheckRaw,
	AbilityCheckRaw
> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<AbilityCheckRaw | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves ability check records from the database for a given action ID
	 * @param id UUID of the action to get ability checks for
	 * @returns The list of ability checks (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			return await db<AbilityCheckRaw>(tableName).where('ActionId', actionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
