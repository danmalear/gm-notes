import { NotImplementedError } from '#shared/error.ts';
import assert from 'assert';
import { beforeEach, suite, test } from 'node:test';
import { CommandBus } from './CommandBus.ts';
import { fakeCommand } from './fakes/command-data-fake.ts';
import { FakeCommandHandler } from './fakes/FakeCommandHandler.ts';
import { FakeCommandRepository } from './fakes/FakeCommandRepository.ts';

suite('CommandBus', () => {
	let commandBus: CommandBus;
	const fakeCommandHandler = new FakeCommandHandler();
	const fakeCommandRepository = new FakeCommandRepository();

	beforeEach(() => {
		commandBus = new CommandBus(fakeCommandRepository);
	});

	suite('subscribe', () => {
		test('subscribes a handler to a new context', () => {
			commandBus.subscribe('Context', fakeCommandHandler);
			assert.strictEqual(
				commandBus.subscribers['Context'][0],
				fakeCommandHandler,
			);
		});

		test('subscribes a handler to an existing context', () => {
			commandBus.subscribers = {
				Context: [fakeCommandHandler],
			};
			const newHandler = fakeCommandHandler.clone();
			commandBus.subscribe('Context', newHandler);
			assert.strictEqual(
				commandBus.subscribers['Context'][0],
				fakeCommandHandler,
			);
			assert.strictEqual(commandBus.subscribers['Context'][1], newHandler);
		});

		test('does not subscribe the same command handler twice', () => {
			commandBus.subscribers = {
				Context: [fakeCommandHandler],
			};
			commandBus.subscribe('Context', fakeCommandHandler);
			assert.strictEqual(commandBus.subscribers['Context'].length, 1);
			assert.strictEqual(
				commandBus.subscribers['Context'][0],
				fakeCommandHandler,
			);
		});
	});

	suite('send', () => {
		beforeEach(() => {
			commandBus.subscribers = {
				[fakeCommand.context]: [fakeCommandHandler],
			};
		});

		test('sends a valid command', async () => {
			await commandBus.send(fakeCommand);
			assert.strictEqual(fakeCommandHandler.calls.handle, 1);
		});

		// @TODO
		test.skip('throws an error when an invalid context is supplied', () => {
			throw new NotImplementedError();
		});
	});
});
