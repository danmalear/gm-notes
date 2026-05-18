import type { Skill } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

/**
 * Hydrated and flattened response structure for ability checks.
 * Useful for showing all relevant data for one record.
 */
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

/**
 * Minimal response structure for ability checks.
 * Useful for showing basic information in a list or as part of a parent object.
 */
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
