import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from '#ability-check/ability-check-dtos.ts';
import type {
	AbilityCheckRec,
	AbilityCheckRefRec,
} from '#ability-check/ability-check-repository.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import { randomUUID } from 'crypto';

const abilityCheckId = randomUUID();
const actionId = randomUUID();
const skill = 'Acrobatics';
const dc = 15;
const successId = randomUUID();
const failureId = randomUUID();
const critSuccessId = randomUUID();
const critFailureId = randomUUID();

// @TODO Move to narration fake?
const success: NarrationModel = {
	NarrationId: successId,
	NarrationTemplateId: null,
	Name: 'Success Narration',
	Description: 'Success Narration Description',
	IsRead: true,
};
const failure: NarrationModel = {
	NarrationId: failureId,
	NarrationTemplateId: null,
	Name: 'Failure Narration',
	Description: 'Failure Narration Description',
	IsRead: false,
};
const critSuccess: NarrationModel = {
	NarrationId: critSuccessId,
	NarrationTemplateId: null,
	Name: 'Critical Success Narration',
	Description: 'Critical Success Narration Description',
	IsRead: true,
};
const critFailure: NarrationModel = {
	NarrationId: critFailureId,
	NarrationTemplateId: null,
	Name: 'Critical Failure Narration',
	Description: 'Critical Failure Narration Description',
	IsRead: false,
};

export const abilityCheckRec: AbilityCheckRec = {
	AbilityCheckId: abilityCheckId,
	ActionId: actionId,
	Skill: skill,
	DC: dc,
	SuccessNarrationId: successId,
	FailureNarrationId: failureId,
	CriticalSuccessNarrationId: critSuccessId,
	CriticalFailureNarrationId: critFailureId,
};

export const abilityCheckRecMin: AbilityCheckRec = {
	AbilityCheckId: abilityCheckId,
	ActionId: actionId,
	Skill: skill,
	DC: dc,
	SuccessNarrationId: null,
	FailureNarrationId: null,
	CriticalSuccessNarrationId: null,
	CriticalFailureNarrationId: null,
};

export const abilityCheckRefRec: AbilityCheckRefRec = {
	AbilityCheckId: abilityCheckId,
	ActionId: actionId,
	Skill: skill,
	DC: dc,
	SuccessNarrationId: successId,
	FailureNarrationId: failureId,
	CriticalSuccessNarrationId: critSuccessId,
	CriticalFailureNarrationId: critFailureId,
	SuccessNarration: success,
	FailureNarration: failure,
	CriticalSuccessNarration: critSuccess,
	CriticalFailureNarration: critFailure,
};

export const abilityCheckRefRecMin: AbilityCheckRefRec = {
	AbilityCheckId: abilityCheckId,
	ActionId: actionId,
	Skill: skill,
	DC: dc,
	SuccessNarrationId: null,
	FailureNarrationId: null,
	CriticalSuccessNarrationId: null,
	CriticalFailureNarrationId: null,
	SuccessNarration: null,
	FailureNarration: null,
	CriticalSuccessNarration: null,
	CriticalFailureNarration: null,
};

export const abilityCheckDto: AbilityCheckResponse = {
	id: abilityCheckId,
	actionId,
	skill,
	dc,
	successNarration: 'Success Narration Description',
	failureNarration: 'Failure Narration Description',
	criticalSuccessNarration: 'Critical Success Narration Description',
	criticalFailureNarration: 'Critical Failure Narration Description',
};

export const abilityCheckDtoMin: AbilityCheckResponse = {
	id: abilityCheckId,
	actionId,
	skill,
	dc,
	successNarration: undefined,
	failureNarration: undefined,
	criticalSuccessNarration: undefined,
	criticalFailureNarration: undefined,
};

export const abilityCheckStub: AbilityCheckStub = {
	id: abilityCheckId,
	actionId,
	skill,
	dc,
	successNarrationId: successId,
	failureNarrationId: failureId,
	criticalSuccessNarrationId: critSuccessId,
	criticalFailureNarrationId: critFailureId,
};

export const abilityCheckStubMin: AbilityCheckStub = {
	id: abilityCheckId,
	actionId,
	skill,
	dc,
	successNarrationId: undefined,
	failureNarrationId: undefined,
	criticalSuccessNarrationId: undefined,
	criticalFailureNarrationId: undefined,
};
