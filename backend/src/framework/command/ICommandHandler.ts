import type { CommandRequest } from './command-dtos.ts';

export interface ICommandHandler {
	handle: (commandRequest: CommandRequest) => unknown;
}
