import type { AbilityCheckStub } from '#dtos/ability-check.ts';
import type { ActionType } from '#dtos/data-types.ts';
import type { UUID } from 'crypto';

export interface ActionStub {
	id: UUID;
	targetId: UUID;
	name: string;
	type?: ActionType;
	narration?: string;
	conditions: string[];
	abilityChecks: AbilityCheckStub[];
}
