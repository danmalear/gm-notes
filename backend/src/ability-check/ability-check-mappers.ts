import type { UUID } from 'node:crypto';
import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import type {
	AbilityCheckFull,
	AbilityCheckMin,
} from './ability-check-repository.ts';

export function toDto(abilityCheck: AbilityCheckFull) {
	const abilityCheckResponse: AbilityCheckResponse = {
		id: abilityCheck.AbilityCheckId as UUID,
		actionId: abilityCheck.ActionId as UUID,
		skill: abilityCheck.Skill,
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

export function toStub(abilityCheck: AbilityCheckMin) {
	const abilityCheckStub: AbilityCheckStub = {
		id: abilityCheck.AbilityCheckId as UUID,
		actionId: abilityCheck.ActionId as UUID,
		skill: abilityCheck.Skill,
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
