import { CommandRequest } from './command-dtos.ts';

export interface ICommandRouter {
	register: (
		domain: string,
		handler: (commandType: string, command: object) => Promise<unknown>,
	) => void;

	send: (command: CommandRequest) => Promise<unknown>;
}

export class CommandRouter implements ICommandRouter {
	commands: Record<
		string,
		(commandType: string, command: object) => Promise<unknown>
	>;

	constructor() {
		this.commands = {};
	}

	register(
		domain: string,
		handler: (commandType: string, command: object) => Promise<unknown>,
	) {
		this.commands[domain] = handler;
	}

	async send(commandRequest: CommandRequest) {
		const { domain, commandType, command } = commandRequest;
		await this.commands[domain](commandType, command);
	}
}
