import type { AbilityCheckStub } from '#ability-check/ability-check-dtos.ts';
import type { UUID } from 'crypto';
import type { ActionType } from './data-types.ts';

export interface ActionStub {
	id: UUID;
	targetId: UUID;
	name: string;
	type?: ActionType;
	narration?: string;
	conditions: string[];
	abilityChecks: AbilityCheckStub[];
}
