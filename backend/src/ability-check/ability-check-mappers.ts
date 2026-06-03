import type { AbilityCheckModel } from '#prisma-models/AbilityCheck.ts';
import type { Skill } from '#shared/data-types.ts';
import type { UUID } from 'node:crypto';
import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import type { AbilityCheckIncludeAll } from './ability-check-repository.ts';

export function toDto(abilityCheck: AbilityCheckIncludeAll) {
	const abilityCheckResponse: AbilityCheckResponse = {
		id: abilityCheck.AbilityCheckId as UUID,
		actionId: abilityCheck.ActionId as UUID,
		skill: abilityCheck.Skill as Skill,
		dc: abilityCheck.DC,
		successNarration: abilityCheck.SuccessNarration?.Description,
		criticalSuccessNarration:
			abilityCheck.CriticalSuccessNarration?.Description,
		failureNarration: abilityCheck.FailureNarration?.Description,
		criticalFailureNarration:
			abilityCheck.CriticalFailureNarration?.Description,
	};

	return abilityCheckResponse;
}

export function toStub(abilityCheck: AbilityCheckModel) {
	const abilityCheckStub: AbilityCheckStub = {
		id: abilityCheck.AbilityCheckId as UUID,
		actionId: abilityCheck.ActionId as UUID,
		skill: abilityCheck.Skill as Skill,
		dc: abilityCheck.DC,
		successNarrationId: (abilityCheck.SuccessNarrationId as UUID) ?? undefined,
		criticalSuccessNarrationId:
			(abilityCheck.CriticalSuccessNarrationId as UUID) ?? undefined,
		failureNarrationId: (abilityCheck.FailureNarrationId as UUID) ?? undefined,
		criticalFailureNarrationId:
			(abilityCheck.CriticalFailureNarrationId as UUID) ?? undefined,
	};

	return abilityCheckStub;
}
