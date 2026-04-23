import { tableColumns } from '#shared/entity-utils.ts';
import type { UUID } from 'crypto';

export const tableName = 'Condition';
export const pkColumn = 'ConditionId';

export const columnNames: (keyof Condition)[] = [
	'ConditionId',
	'CampaignId',
	'Name',
	'Description',
	'IsMet',
];

export const tableColumnNames = tableColumns(tableName, columnNames);

export interface Condition {
	ConditionId: UUID;
	CampaignId: UUID;
	Name: string;
	Description: string;
	IsMet: boolean;
}
