import { BadRequestError } from '#shared/error.ts';
import assert from 'assert';
import { randomUUID } from 'crypto';
import test, { suite } from 'node:test';
import {
	validateCommandRequest,
	type CommandRequest,
} from '../command-dtos.ts';

suite('Command DTOs', () => {
	suite('validateCommandRequest', () => {
		const validContext = 'Context';
		const validRef = 'DoThis';
		const validStreamId = randomUUID();
		const validStreamVersion = 0;
		const validData = {
			prop1: 'string',
			prop2: 1,
		};

		const validCommandRequest: CommandRequest = {
			context: validContext,
			ref: validRef,
			streamId: validStreamId,
			streamVersion: validStreamVersion,
			data: validData,
		};

		test('validates a complete valid command request', () => {
			assert.doesNotThrow(() => validateCommandRequest(validCommandRequest));
		});

		test('validates a minimal valid command request', () => {
			const command = {
				...validCommandRequest,
				streamId: undefined,
				streamVersion: undefined,
				data: {},
			};

			assert.doesNotThrow(() => validateCommandRequest(command));
		});

		test('throws an error with no command request', () => {
			assert.throws(
				() => validateCommandRequest(undefined),
				new BadRequestError(`No body supplied to Command request`),
			);
		});

		test('throws an error with bad command request', () => {
			assert.throws(
				() => validateCommandRequest(validRef),
				new BadRequestError(`Invalid body supplied to Command request`),
			);
		});

		test('throws an error with no context', () => {
			const command = {
				...validCommandRequest,
				context: undefined,
			};

			assert.throws(
				() => validateCommandRequest(command),
				new BadRequestError(`Invalid context supplied to Command request`),
			);
		});

		test('throws an error with no ref', () => {
			const command = {
				...validCommandRequest,
				ref: undefined,
			};

			assert.throws(
				() => validateCommandRequest(command),
				new BadRequestError(`Invalid ref supplied to Command request`),
			);
		});

		test('throws an error with null stream ID', () => {
			const command = {
				...validCommandRequest,
				streamId: null,
			};

			assert.throws(
				() => validateCommandRequest(command),
				new BadRequestError(`Invalid stream ID supplied to Command request`),
			);
		});

		test('throws an error with bad stream ID', () => {
			const command = {
				...validCommandRequest,
				streamId: 'Stream1',
			};

			assert.throws(() => validateCommandRequest(command));
		});

		test('throws an error with bad stream version', () => {
			const command = {
				...validCommandRequest,
				streamVersion: -1,
			};

			assert.throws(
				() => validateCommandRequest(command),
				new BadRequestError(
					`Invalid stream version supplied to Command request`,
				),
			);
		});

		test('throws an error with no data', () => {
			const command = {
				...validCommandRequest,
				data: undefined,
			};

			assert.throws(
				() => validateCommandRequest(command),
				new BadRequestError(`Invalid data supplied to Command request`),
			);
		});
	});
});
