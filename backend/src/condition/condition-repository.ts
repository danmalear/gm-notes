import { db } from '#shared/db.ts';
import { tableColumns } from '#shared/entity-utils.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface ConditionRec {
	ConditionId: UUID;
	CampaignId: UUID;
	Name: string;
	Description: string;
	IsMet: boolean;
}

export interface ActionConditionRec {
	ActionId: UUID;
	ConditionId: UUID;
}

export const tableName = 'Condition';
export const pkColumn = 'ConditionId';

const columnNames: (keyof ConditionRec)[] = [
	'ConditionId',
	'CampaignId',
	'Name',
	'Description',
	'IsMet',
];

export const tableColumnNames = tableColumns(tableName, columnNames);

export const actionJoinTableName = 'ActionCondition';
export const actionIdColName = 'ActionId';
export const conditionIdColName = 'ConditionId';

export class ConditionRepository extends Repository<ConditionRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	clone() {
		return new ConditionRepository();
	}

	override async getById(id: UUID): Promise<ConditionRec | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves condition records from the database for a given action ID
	 * @param id UUID of the action to get conditions for
	 * @returns The list of conditions (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			return await db<ConditionRec>(this.tableName)
				.innerJoin<ActionConditionRec>(
					actionJoinTableName,
					`${actionJoinTableName}.${conditionIdColName}`,
					`${this.tableName}.${this.pkColumn}`,
				)
				.where(`${actionJoinTableName}.${actionIdColName}`, actionId)
				.select<ConditionRec[]>(tableColumnNames);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
