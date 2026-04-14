import type { AbilityCheckStub } from '#ability-check/ability-check-dtos.ts';
import type { ActionType } from '#shared/data-types.ts';
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
