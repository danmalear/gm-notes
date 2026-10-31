import { toStub as abilityCheckToStub } from '#ability-check/ability-check-mappers.ts';
import type { UUID } from 'node:crypto';
import type { ActionResponse, ActionStub } from './action-dtos.ts';
import type { ActionFull, ActionMin } from './action-repository.ts';

export function toDto(action: ActionFull) {
	const actionDto: ActionResponse = {
		id: action.ActionId as UUID,
		targetId: action.TargetId as UUID,
		name: action.Name,
		type: action.Type ?? undefined,
		narration: action.Narration?.Description,
		conditions: action.Conditions.map((condition) => condition.Description),
		abilityChecks: action.AbilityChecks.map(abilityCheckToStub),
		// @TODO
		// notes: [],
	};

	return actionDto;
}

export function toStub(action: ActionMin) {
	const actionStub: ActionStub = {
		id: action.ActionId as UUID,
		targetId: action.TargetId as UUID,
		name: action.Name,
		type: action.Type ?? undefined,
	};

	return actionStub;
}
