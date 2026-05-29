import { FakeWebSocketServer } from '#framework/fakes/FakeWebsocketServer.ts';
import { FakeStreamRepository } from '#framework/stream/fakes/FakeStreamRepository.ts';
import assert from 'assert';
import { beforeEach, suite, test } from 'node:test';
import { EventBus } from './event-bus.ts';
import type { Event } from './event.ts';
import { fakeEvent } from './fakes/event-data-fake.ts';
import { FakeEventSubscriber } from './fakes/fake-event-subscriber.ts';
import { FakeEventRepository } from './fakes/FakeEventRepository.ts';

suite('CommandBus', () => {
	let eventBus: EventBus;
	const fakeEventHandler = new FakeEventSubscriber();
	const fakeEventRepository = new FakeEventRepository();
	const fakeStreamRepository = new FakeStreamRepository();
	const fakeWss = new FakeWebSocketServer();

	beforeEach(() => {
		fakeEventHandler.resetCalls();
		eventBus = new EventBus({
			eventRepository: fakeEventRepository,
			streamRepository: fakeStreamRepository,
			wss: fakeWss,
		});
	});

	suite('subscribe', () => {
		test('subscribes a handler to a new context', () => {
			eventBus.subscribe('Context', fakeEventHandler);
			assert.strictEqual(eventBus.subscribers['Context'][0], fakeEventHandler);
		});

		test('subscribes a handler to an existing context', () => {
			eventBus.subscribers = {
				Context: [fakeEventHandler],
			};
			const newHandler = fakeEventHandler.clone();
			eventBus.subscribe('Context', newHandler);
			assert.strictEqual(eventBus.subscribers['Context'][0], fakeEventHandler);
			assert.strictEqual(eventBus.subscribers['Context'][1], newHandler);
		});

		test('does not subscribe the same event handler twice', () => {
			eventBus.subscribers = {
				Context: [fakeEventHandler],
			};
			eventBus.subscribe('Context', fakeEventHandler);
			assert.strictEqual(eventBus.subscribers['Context'].length, 1);
			assert.strictEqual(eventBus.subscribers['Context'][0], fakeEventHandler);
		});
	});

	suite('send', () => {
		beforeEach(() => {
			eventBus.subscribers = {
				[fakeEvent.context]: [fakeEventHandler],
			};
		});

		test('sends a valid event', async () => {
			await eventBus.send(fakeEvent);
			assert.strictEqual(fakeEventHandler.calls.handle, 1);
		});

		test('nothing happens when an invalid context is supplied', async () => {
			const badEvent = fakeEvent.clone() as Event<string, string, object>;
			badEvent.context = 'BadContext';
			await eventBus.send(badEvent);
			assert.strictEqual(fakeEventHandler.calls.handle, 0);
		});
	});
});
