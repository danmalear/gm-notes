import type { ActionType } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'Action';
export const pkColumn = 'ActionId';

export interface Action {
	ActionId: UUID;
	TargetId: UUID;
	Name: string;
	Type: ActionType | null;
	NarrationId: UUID | null;
}
