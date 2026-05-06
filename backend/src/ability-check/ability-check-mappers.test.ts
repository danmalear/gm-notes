import type { NarrationRec } from '#narration/narration-repository.ts';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { suite, test } from 'node:test';
import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import { toDto, toStub } from './ability-check-mappers.ts';
import type {
	AbilityCheckRec,
	AbilityCheckRefRec,
} from './ability-check-repository.ts';

suite('Ability Check mappers', () => {
	const abilityCheckId = randomUUID();
	const actionId = randomUUID();
	const skill = 'Acrobatics';
	const dc = 15;
	const successId = randomUUID();
	const failureId = randomUUID();
	const critSuccessId = randomUUID();
	const critFailureId = randomUUID();

	suite('toDto', () => {
		test('correctly maps a complete record to a DTO', () => {
			const success: NarrationRec = {
				NarrationId: successId,
				NarrationTemplateId: null,
				Name: 'Success Narration',
				Description: 'Success Narration Description',
				IsRead: true,
			};
			const failure: NarrationRec = {
				NarrationId: failureId,
				NarrationTemplateId: null,
				Name: 'Failure Narration',
				Description: 'Failure Narration Description',
				IsRead: false,
			};
			const critSuccess: NarrationRec = {
				NarrationId: critSuccessId,
				NarrationTemplateId: null,
				Name: 'Critical Success Narration',
				Description: 'Critical Success Narration Description',
				IsRead: true,
			};
			const critFailure: NarrationRec = {
				NarrationId: critFailureId,
				NarrationTemplateId: null,
				Name: 'Critical Failure Narration',
				Description: 'Critical Failure Narration Description',
				IsRead: false,
			};

			const abilityCheckRec: AbilityCheckRefRec = {
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

			const abilityCheckDto: AbilityCheckResponse = {
				id: abilityCheckId,
				actionId,
				skill,
				dc,
				successNarration: 'Success Narration Description',
				failureNarration: 'Failure Narration Description',
				criticalSuccessNarration: 'Critical Success Narration Description',
				criticalFailureNarration: 'Critical Failure Narration Description',
			};

			const testDto = toDto(abilityCheckRec);
			assert.deepStrictEqual(testDto, abilityCheckDto);
		});

		test('correctly maps a minimal record to a DTO', () => {
			const abilityCheckRec: AbilityCheckRefRec = {
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

			const abilityCheckDto: AbilityCheckResponse = {
				id: abilityCheckId,
				actionId,
				skill,
				dc,
				successNarration: undefined,
				failureNarration: undefined,
				criticalSuccessNarration: undefined,
				criticalFailureNarration: undefined,
			};

			const testDto = toDto(abilityCheckRec);
			assert.deepStrictEqual(testDto, abilityCheckDto);
		});
	});

	suite('toStub', () => {
		test('correctly maps a complete record to a stub', () => {
			const abilityCheckRec: AbilityCheckRec = {
				AbilityCheckId: abilityCheckId,
				ActionId: actionId,
				Skill: skill,
				DC: dc,
				SuccessNarrationId: successId,
				FailureNarrationId: failureId,
				CriticalSuccessNarrationId: critSuccessId,
				CriticalFailureNarrationId: critFailureId,
			};

			const abilityCheckStub: AbilityCheckStub = {
				id: abilityCheckId,
				actionId,
				skill,
				dc,
				successNarrationId: successId,
				failureNarrationId: failureId,
				criticalSuccessNarrationId: critSuccessId,
				criticalFailureNarrationId: critFailureId,
			};

			const testStub = toStub(abilityCheckRec);
			assert.deepStrictEqual(testStub, abilityCheckStub);
		});

		test('correctly maps a minimal record to a stub', () => {
			const abilityCheckRec: AbilityCheckRec = {
				AbilityCheckId: abilityCheckId,
				ActionId: actionId,
				Skill: skill,
				DC: dc,
				SuccessNarrationId: null,
				FailureNarrationId: null,
				CriticalSuccessNarrationId: null,
				CriticalFailureNarrationId: null,
			};

			const abilityCheckStub: AbilityCheckStub = {
				id: abilityCheckId,
				actionId,
				skill,
				dc,
				successNarrationId: undefined,
				failureNarrationId: undefined,
				criticalSuccessNarrationId: undefined,
				criticalFailureNarrationId: undefined,
			};

			const testStub = toStub(abilityCheckRec);
			assert.deepStrictEqual(testStub, abilityCheckStub);
		});
	});
});
