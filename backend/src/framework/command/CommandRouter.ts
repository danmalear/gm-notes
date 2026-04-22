import type { UUID } from 'crypto';
import type { CommandRequest } from './command-dtos.ts';
import type { ICommandHandler } from './ICommandHandler.ts';

export interface ICommandRouter {
	register: (domain: string, handler: ICommandHandler) => void;

	send: <TCommandRequest extends CommandRequest>(
		command: TCommandRequest,
	) => Promise<UUID>;
}

export class CommandRouter implements ICommandRouter {
	commands: Record<string, ICommandHandler>;

	constructor() {
		this.commands = {};
	}

	register(domain: string, handler: ICommandHandler) {
		this.commands[domain] = handler;
	}

	async send<TCommandRequest extends CommandRequest>(
		commandRequest: TCommandRequest,
	) {
		const { domain } = commandRequest;
		return await this.commands[domain].handle(commandRequest);
	}
}
