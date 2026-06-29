import assert from 'assert';
import { suite, test } from 'node:test';
import { toDto, toStub } from './ability-check-mappers.ts';
import {
	abilityCheckDto,
	abilityCheckDtoMin,
	abilityCheckRec,
	abilityCheckRecMin,
	abilityCheckRefRec,
	abilityCheckRefRecMin,
	abilityCheckStub,
	abilityCheckStubMin,
} from './fakes/fake-ability-check-data.ts';

suite('Ability Check mappers', () => {
	suite('toDto', () => {
		test('correctly maps a complete record to a DTO', () => {
			const testDto = toDto(abilityCheckRefRec);
			assert.deepStrictEqual(testDto, abilityCheckDto);
		});

		test('correctly maps a minimal record to a DTO', () => {
			const testDto = toDto(abilityCheckRefRecMin);
			assert.deepStrictEqual(testDto, abilityCheckDtoMin);
		});
	});

	suite('toStub', () => {
		test('correctly maps a complete record to a stub', () => {
			const testStub = toStub(abilityCheckRec);
			assert.deepStrictEqual(testStub, abilityCheckStub);
		});

		test('correctly maps a minimal record to a stub', () => {
			const testStub = toStub(abilityCheckRecMin);
			assert.deepStrictEqual(testStub, abilityCheckStubMin);
		});
	});
});
