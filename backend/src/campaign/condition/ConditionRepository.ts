import {
	actionIdColName,
	tableName as actionJoinTableName,
	conditionIdColName,
	type ActionCondition,
} from '#action/ActionCondition.ts';
import type { UUID } from 'crypto';
import { db } from '../../db.ts';
import { getMessage } from '../../helpers/error.ts';
import { Repository } from '../../repositories/Repository.ts';
import { pkColumn, tableName, type Condition } from './Condition.ts';

export class ConditionRepository extends Repository<Condition> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves condition records from the database for a given action ID
	 * @param id UUID of the action to get conditions for
	 * @returns The list of conditions (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			return await db<Condition>(this.tableName)
				.innerJoin<ActionCondition>(
					actionJoinTableName,
					`${actionJoinTableName}.${conditionIdColName}`,
					`${this.tableName}.${this.pkColumn}`,
				)
				.where(`${actionJoinTableName}.${actionIdColName}`, actionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
