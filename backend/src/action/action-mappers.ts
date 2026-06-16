import { toStub as abilityCheckToStub } from '#ability-check/ability-check-mappers.ts';
import type { ActionModel } from '#prisma-models/Action.ts';
import type { UUID } from 'node:crypto';
import type { ActionResponse, ActionStub } from './action-dtos.ts';
import type { ActionIncludeAll } from './action-repository.ts';

export function toDto(action: ActionIncludeAll) {
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

export function toStub(action: ActionModel) {
	const actionStub: ActionStub = {
		id: action.ActionId as UUID,
		targetId: action.TargetId as UUID,
		name: action.Name,
		type: action.Type ?? undefined,
	};

	return actionStub;
}
