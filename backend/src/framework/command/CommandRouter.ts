import type { CommandRequest } from './command-dtos.ts';
import type { CommandFunction } from './command-types.ts';

export interface ICommandRouter {
	register: (domain: string, handler: CommandFunction<CommandRequest>) => void;

	send: <TCommandRequest extends CommandRequest>(
		command: TCommandRequest,
	) => Promise<unknown>;
}

export class CommandRouter implements ICommandRouter {
	commands: Record<string, CommandFunction<CommandRequest>>;

	constructor() {
		this.commands = {};
	}

	register(domain: string, handler: CommandFunction<CommandRequest>) {
		this.commands[domain] = handler;
	}

	async send<TCommandRequest extends CommandRequest>(
		commandRequest: TCommandRequest,
	) {
		const { domain } = commandRequest;
		await this.commands[domain](commandRequest);
	}
}
