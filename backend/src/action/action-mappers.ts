import { toStub as abilityCheckToStub } from '#ability-check/ability-check-mappers.ts';
import type { ActionResponse, ActionStub } from './action-dtos.ts';
import type { ActionRec, ActionRefRec } from './action-repository.ts';

export function toDto(action: ActionRefRec) {
	const actionDto: ActionResponse = {
		id: action.ActionId,
		targetId: action.TargetId,
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

export function toStub(action: ActionRec) {
	const actionStub: ActionStub = {
		id: action.ActionId,
		targetId: action.TargetId,
		name: action.Name,
		type: action.Type ?? undefined,
	};

	return actionStub;
}
