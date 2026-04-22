import type { CommandRequest } from './command-dtos.ts';

export interface ICommandRouter {
	register: (
		domain: string,
		handler: (commandRequest: CommandRequest) => Promise<unknown>,
	) => void;

	send: (command: CommandRequest) => Promise<unknown>;
}

export class CommandRouter implements ICommandRouter {
	commands: Record<
		string,
		(commandRequest: CommandRequest) => Promise<unknown>
	>;

	constructor() {
		this.commands = {};
	}

	register(
		domain: string,
		handler: (commandRequest: CommandRequest) => Promise<unknown>,
	) {
		this.commands[domain] = handler;
	}

	async send(commandRequest: CommandRequest) {
		const { domain } = commandRequest;
		await this.commands[domain](commandRequest);
	}
}
