import type { UUID } from 'crypto';

export const tableName = 'Condition';
export const pkColumn = 'ConditionId';

export interface Condition {
	ConditionId: UUID;
	Name: string;
	Description: string;
	IsMet: boolean;
}
