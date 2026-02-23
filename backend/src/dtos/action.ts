import type { UUID } from 'crypto';
import type { ActionType } from './data-types';

export interface ActionStub {
	id: UUID;
	targetId: UUID;
	name: string;
	type?: ActionType;
	narration?: string;
	// @TODO
	abilityChecks?: unknown[];
}
