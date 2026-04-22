import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import type { AbilityCheck, AbilityCheckRaw } from './AbilityCheck.ts';

export function toDto(abilityCheck: AbilityCheck) {
	const abilityCheckResponse: AbilityCheckResponse = {
		id: abilityCheck.AbilityCheckId,
		actionId: abilityCheck.ActionId,
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

export function toStub(abilityCheck: AbilityCheckRaw) {
	const abilityCheckStub: AbilityCheckStub = {
		id: abilityCheck.AbilityCheckId,
		actionId: abilityCheck.ActionId,
		skill: abilityCheck.Skill,
		dc: abilityCheck.DC,
		successNarrationId: abilityCheck.SuccessNarrationId ?? undefined,
		criticalSuccessNarrationId:
			abilityCheck.CriticalSuccessNarrationId ?? undefined,
		failureNarrationId: abilityCheck.FailureNarrationId ?? undefined,
		criticalFailureNarrationId:
			abilityCheck.CriticalFailureNarrationId ?? undefined,
	};

	return abilityCheckStub;
}
