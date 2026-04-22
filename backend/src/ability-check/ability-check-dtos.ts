import type { Skill } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export interface AbilityCheckStub {
	id: UUID;
	actionId: UUID;
	skill: Skill;
	dc: number;
	successNarration?: string;
	failureNarration?: string;
	criticalSuccessNarration?: string;
	criticalFailureNarration?: string;
}
