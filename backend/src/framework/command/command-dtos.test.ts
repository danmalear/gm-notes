import { BadRequestError } from '#shared/error.ts';
import assert from 'assert';
import { randomUUID } from 'crypto';
import test, { suite } from 'node:test';
import { validateCommand } from './command-dtos.ts';
import type { Command } from './Command.ts';

suite('Command DTOs', () => {
	suite('validateCommand', () => {
		const validType = 'Command';
		const validContext = 'Context';
		const validRef = 'DoThis';
		const validStreamId = randomUUID();
		const validCorrelationId = randomUUID();
		const validStreamVersion = 0;
		const validData = {
			prop1: 'string',
			prop2: 1,
		};

		const validCommand: Command = {
			type: validType,
			context: validContext,
			ref: validRef,
			streamId: validStreamId,
			correlationId: validCorrelationId,
			streamVersion: validStreamVersion,
			data: validData,
		};

		test('validates a complete valid command', () => {
			assert.doesNotThrow(() => validateCommand(validCommand));
		});

		test('validates a minimal valid command', () => {
			const command: Command = {
				...validCommand,
				streamId: undefined,
				data: {},
			};

			assert.doesNotThrow(() => validateCommand(command));
		});

		test('throws an error with no command', () => {
			assert.throws(
				() => validateCommand(undefined),
				new BadRequestError(`No body supplied to Command request`),
			);
		});

		test('throws an error with bad command', () => {
			assert.throws(
				() => validateCommand(validRef),
				new BadRequestError(`Invalid body supplied to Command request`),
			);
		});

		test('throws an error with no type', () => {
			const command = {
				...validCommand,
				type: undefined,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(`Invalid message type supplied to Command request`),
			);
		});

		test('throws an error with a bad type', () => {
			const command = {
				...validCommand,
				type: 'Event',
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(`Invalid message type supplied to Command request`),
			);
		});

		test('throws an error with no context', () => {
			const command = {
				...validCommand,
				context: undefined,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(`Invalid context supplied to Command request`),
			);
		});

		test('throws an error with no ref', () => {
			const command = {
				...validCommand,
				ref: undefined,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(`Invalid ref supplied to Command request`),
			);
		});

		test('throws an error with null stream ID', () => {
			const command = {
				...validCommand,
				streamId: null,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(`Invalid stream ID supplied to Command request`),
			);
		});

		test('throws an error with bad stream ID', () => {
			const command = {
				...validCommand,
				streamId: 'Stream1',
			};

			assert.throws(() => validateCommand(command));
		});

		test('throws an error with no correlation ID', () => {
			const command = {
				...validCommand,
				correlationId: undefined,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(
					`Invalid correlation ID supplied to Command request`,
				),
			);
		});

		test('throws an error with no stream version', () => {
			const command = {
				...validCommand,
				streamVersion: undefined,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(
					`Invalid stream version supplied to Command request`,
				),
			);
		});

		test('throws an error with bad stream version', () => {
			const command = {
				...validCommand,
				streamVersion: -1,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(
					`Invalid stream version supplied to Command request`,
				),
			);
		});

		test('throws an error with no data', () => {
			const command = {
				...validCommand,
				data: undefined,
			};

			assert.throws(
				() => validateCommand(command),
				new BadRequestError(`Invalid data supplied to Command request`),
			);
		});
	});
});
