import type { UUID } from 'crypto';
import type { ActionType } from './data-types';

export const tableName = 'Action';
export const pkColumn = 'ActionId';

export interface Action {
	ActionId: UUID;
	TargetId: UUID;
	Name: string;
	Type: ActionType;
	NarrationId: UUID | null;
}
