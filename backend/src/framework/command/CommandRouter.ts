import type { UUID } from 'crypto';
import type { CommandRequest } from './command-dtos.ts';
import type { ICommandHandler } from './ICommandHandler.ts';

export interface ICommandRouter {
	register: (context: string, handler: ICommandHandler) => void;

	send: <TCommandRequest extends CommandRequest>(
		commandRequest: TCommandRequest,
	) => Promise<UUID>;
}

export class CommandRouter implements ICommandRouter {
	handlers: Record<string, ICommandHandler>;

	constructor() {
		this.handlers = {};
	}

	register(context: string, handler: ICommandHandler) {
		this.handlers[context] = handler;
	}

	async send<TCommandRequest extends CommandRequest>(
		commandRequest: TCommandRequest,
	) {
		const { context } = commandRequest;
		return await this.handlers[context].handle(commandRequest);
	}
}
