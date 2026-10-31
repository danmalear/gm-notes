import assert from 'assert';
import { suite, test } from 'node:test';
import { toDto, toStub } from './ability-check-mappers.ts';
import {
	abilityCheckDto,
	abilityCheckDtoNulls,
	abilityCheckFull,
	abilityCheckFullNulls,
	abilityCheckMin,
	abilityCheckMinNulls,
	abilityCheckStub,
	abilityCheckStubNulls,
} from './fakes/fake-ability-check-data.ts';

suite('Ability Check mappers', () => {
	suite('toDto', () => {
		test('correctly maps a complete record to a DTO', () => {
			const testDto = toDto(abilityCheckFull);
			assert.deepStrictEqual(testDto, abilityCheckDto);
		});

		test('correctly maps a minimal record to a DTO', () => {
			const testDto = toDto(abilityCheckFullNulls);
			assert.deepStrictEqual(testDto, abilityCheckDtoNulls);
		});
	});

	suite('toStub', () => {
		test('correctly maps a complete record to a stub', () => {
			const testStub = toStub(abilityCheckMin);
			assert.deepStrictEqual(testStub, abilityCheckStub);
		});

		test('correctly maps a minimal record to a stub', () => {
			const testStub = toStub(abilityCheckMinNulls);
			assert.deepStrictEqual(testStub, abilityCheckStubNulls);
		});
	});
});
