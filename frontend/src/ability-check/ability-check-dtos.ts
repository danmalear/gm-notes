import type { UUID } from 'crypto';
import type { Skill } from '../dtos/data-types.ts';

export interface AbilityCheckResponse {
	id: UUID;
	actionId: UUID;
	skill: Skill;
	dc: number;
	successNarration?: string;
	failureNarration?: string;
	criticalSuccessNarration?: string;
	criticalFailureNarration?: string;
}

export interface AbilityCheckStub {
	id: UUID;
	actionId: UUID;
	skill: Skill;
	dc: number;
	successNarrationId?: UUID;
	failureNarrationId?: UUID;
	criticalSuccessNarrationId?: UUID;
	criticalFailureNarrationId?: UUID;
}
