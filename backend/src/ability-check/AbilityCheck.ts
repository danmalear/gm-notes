import type { Narration } from '#narration/Narration.ts';
import type { Skill } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'AbilityCheck';
export const pkColumn = 'AbilityCheckId';

export interface AbilityCheckRaw {
	AbilityCheckId: UUID;
	ActionId: UUID;
	Skill: Skill;
	DC: number;
	SuccessNarrationId: UUID | null;
	FailureNarrationId: UUID | null;
	CriticalSuccessNarrationId: UUID | null;
	CriticalFailureNarrationId: UUID | null;
}

export interface AbilityCheck extends AbilityCheckRaw {
	SuccessNarration: Narration | null;
	FailureNarration: Narration | null;
	CriticalSuccessNarration: Narration | null;
	CriticalFailureNarration: Narration | null;
}
