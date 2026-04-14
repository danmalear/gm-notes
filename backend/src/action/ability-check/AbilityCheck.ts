import type { Skill } from '#dtos/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'AbilityCheck';
export const pkColumn = 'AbilityCheckId';

export interface AbilityCheck {
	AbilityCheckId: UUID;
	ActionId: UUID;
	Skill: Skill;
	DC: number;
	SuccessNarrationId: UUID | null;
	FailureNarrationId: UUID | null;
	CriticalSuccessNarrationId: UUID | null;
	CriticalFailureNarrationId: UUID | null;
}
