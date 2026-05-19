import type { Faker, FakerCalls } from '#shared/Faker.ts';
import { EventEmitter } from 'events';
import type { WebSocket, WebSocketServer } from 'ws';

const zeroCalls: FakerCalls<WebSocketServer> = {
	address: 0,
	close: 0,
	handleUpgrade: 0,
	shouldHandle: 0,
	on: 0,
	once: 0,
	off: 0,
	addListener: 0,
	removeListener: 0,
	removeAllListeners: 0,
	setMaxListeners: 0,
	getMaxListeners: 0,
	listeners: 0,
	rawListeners: 0,
	emit: 0,
	listenerCount: 0,
	prependListener: 0,
	prependOnceListener: 0,
	eventNames: 0,
	[EventEmitter.captureRejectionSymbol]: 0,
};

export class FakeWebSocketServer implements Faker<WebSocketServer> {
	options: object;
	path: string;
	clients: Set<WebSocket>;
	calls: FakerCalls<WebSocketServer>;

	constructor() {
		this.options = {};
		this.path = '';
		this.clients = new Set();
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	address() {
		this.calls.address++;
		return null;
	}

	close() {
		this.calls.close++;
		return null;
	}

	handleUpgrade() {
		this.calls.handleUpgrade++;
		return null;
	}

	shouldHandle() {
		this.calls.shouldHandle++;
		return true;
	}

	on() {
		this.calls.on++;
		return this;
	}

	once() {
		this.calls.once++;
		return this;
	}

	off() {
		this.calls.off++;
		return this;
	}

	addListener() {
		this.calls.addListener++;
		return this;
	}

	removeListener() {
		this.calls.removeListener++;
		return this;
	}

	removeAllListeners() {
		this.calls.removeAllListeners++;
		return this;
	}

	setMaxListeners() {
		this.calls.setMaxListeners++;
		return this;
	}

	getMaxListeners() {
		this.calls.getMaxListeners++;
		return 0;
	}

	listeners() {
		this.calls.listeners++;
		return [];
	}

	rawListeners() {
		this.calls.rawListeners++;
		return [];
	}

	emit() {
		this.calls.emit++;
		return true;
	}

	listenerCount() {
		this.calls.listenerCount++;
		return 0;
	}

	prependListener() {
		this.calls.prependListener++;
		return this;
	}

	prependOnceListener() {
		this.calls.prependOnceListener++;
		return this;
	}

	eventNames() {
		this.calls.eventNames++;
		return [];
	}

	[EventEmitter.captureRejectionSymbol]() {
		this.calls[EventEmitter.captureRejectionSymbol]++;
	}
}
