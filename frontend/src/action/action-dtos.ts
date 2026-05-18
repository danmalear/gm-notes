import type { AbilityCheckStub } from '#ability-check/ability-check-dtos.ts';
import type { ActionType } from '#shared/data/data-types.ts';
import type { UUID } from 'crypto';

/**
 * Hydrated and flattened response structure for actions.
 * Useful for showing all relevant data for one record.
 */
export interface ActionResponse {
	id: UUID;
	targetId: UUID;
	name: string;
	type?: ActionType;
	narration?: string;
	conditions: string[];
	abilityChecks: AbilityCheckStub[];
}

/**
 * Minimal response structure for actions.
 * Useful for showing basic information in a list or as part of a parent object.
 */
export interface ActionStub {
	id: UUID;
	targetId: UUID;
	name: string;
	type?: ActionType;
}
