import type { UUID } from 'crypto';
import type { Skill } from './data-types.ts';

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
