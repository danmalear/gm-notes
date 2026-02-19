import type { UUID } from 'crypto';

export const tableName = 'Description';
export const pkColumn = 'DescriptionId';

export interface Description {
	DescriptionId: UUID;
	DescriptionTemplateId: UUID | null;
	ParentId: UUID;
	Name: string;
	Description: string;
}
