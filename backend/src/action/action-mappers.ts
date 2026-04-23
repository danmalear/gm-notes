import { toStub as abilityCheckToStub } from '#ability-check/ability-check-mappers.ts';
import type { ActionResponse, ActionStub } from './action-dtos.ts';
import type { Action, ActionRaw } from './Action.ts';

export function toDto(action: Action) {
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

export function toStub(action: ActionRaw) {
	const actionStub: ActionStub = {
		id: action.ActionId,
		targetId: action.TargetId,
		name: action.Name,
		type: action.Type ?? undefined,
	};

	return actionStub;
}
