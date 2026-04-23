import type { AbilityCheckRaw } from '#ability-check/AbilityCheck.ts';
import type { Condition } from '#condition/Condition.ts';
import type { Narration } from '#narration/Narration.ts';
import type { ActionType } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'Action';
export const pkColumn = 'ActionId';

export interface ActionRaw {
	ActionId: UUID;
	TargetId: UUID;
	Name: string;
	Type: ActionType | null;
	NarrationId: UUID | null;
}

export interface Action extends ActionRaw {
	Narration: Narration | null;
	Conditions: Condition[];
	AbilityChecks: AbilityCheckRaw[];
}
