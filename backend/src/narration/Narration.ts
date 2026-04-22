import { tableColumns } from '#shared/entity-utils.ts';
import type { UUID } from 'crypto';

export const tableName = 'Narration';
export const pkColumn = 'NarrationId';

export const columnNames: (keyof Narration)[] = [
	'NarrationId',
	'NarrationTemplateId',
	'Name',
	'Description',
	'IsRead',
];

export const tableColumnNames = tableColumns(tableName, columnNames);

export interface Narration {
	NarrationId: UUID;
	NarrationTemplateId: UUID | null;
	Name: string;
	Description: string;
	IsRead: boolean;
}
