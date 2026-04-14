import type { UUID } from 'crypto';
import type { ActionType } from '../entities/data-types.ts';

export const tableName = 'Action';
export const pkColumn = 'ActionId';

export interface Action {
	ActionId: UUID;
	TargetId: UUID;
	Name: string;
	Type: ActionType | null;
	NarrationId: UUID | null;
}
