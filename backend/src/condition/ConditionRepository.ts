import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import {
	actionIdColName,
	tableName as actionJoinTableName,
	conditionIdColName,
	type ActionCondition,
} from './ActionCondition.ts';
import {
	pkColumn,
	tableColumnNames,
	tableName,
	type Condition,
} from './Condition.ts';

export class ConditionRepository extends Repository<Condition> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<Condition | undefined> {
		return await this.getByIdRaw(id);
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
				.where(`${actionJoinTableName}.${actionIdColName}`, actionId)
				.select<Condition[]>(tableColumnNames);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
