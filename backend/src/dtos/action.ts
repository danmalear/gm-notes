import type { UUID } from 'crypto';
import type { AbilityCheckStub } from './ability-check.ts';
import type { ActionType } from './data-types.ts';

export interface ActionStub {
	id: UUID;
	targetId: UUID;
	name: string;
	type?: ActionType;
	narration?: string;
	abilityChecks: AbilityCheckStub[];
}
