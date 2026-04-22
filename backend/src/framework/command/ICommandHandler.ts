import type { UUID } from 'crypto';
import type { CommandRequest } from './command-dtos.ts';

export interface ICommandHandler {
	handle: (commandRequest: CommandRequest) => Promise<UUID>;
}
