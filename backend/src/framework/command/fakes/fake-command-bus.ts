import type { CommandHandler } from '#command/command-handler.ts';
import type { ICommandRepository } from '#command/command-repository.ts';
import { FakeWebSocketServer } from '#framework/fakes/FakeWebsocketServer.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import type { UUID } from 'crypto';
import { randomUUID } from 'crypto';
import type { WebSocketServer } from 'ws';
import type { CommandBus } from '../command-bus.ts';
import { FakeCommandRepository } from './fake-command-repository.ts';

const zeroCalls: FakerCalls<CommandBus> = {
	send: 0,
	subscribe: 0,
};

export class FakeCommandBus implements Faker<CommandBus> {
	commandRepository: ICommandRepository;
	wss: WebSocketServer;
	subscribers: Record<string, CommandHandler[]>;
	calls: FakerCalls<CommandBus>;

	constructor() {
		this.commandRepository = new FakeCommandRepository();
		this.wss = new FakeWebSocketServer();
		this.subscribers = {};
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	async send(): Promise<UUID> {
		return randomUUID();
	}

	subscribe() {
		return;
	}
}
