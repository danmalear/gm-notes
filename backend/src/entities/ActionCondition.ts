import type { UUID } from 'crypto';

export const tableName = 'ActionCondition';
export const pkColumns = ['ActionId', 'ConditionId'];
export const actionIdColName = 'ActionId';
export const conditionIdColName = 'ConditionId';

export interface ActionCondition {
	ActionId: UUID;
	ConditionId: UUID;
}
