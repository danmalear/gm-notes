import type { CommandRequest } from './command-dtos.ts';

export interface ICommandHandler<TCommandRequest extends CommandRequest> {
	handle: (commandRequest: TCommandRequest) => unknown;
}
