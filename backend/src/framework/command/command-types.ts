import type { UUID } from 'crypto';
import type { CommandRequest } from './command-dtos.ts';

// @TODO this is a bit weird - maybe revisit after events are implemented
interface CommandIdResponse {
	id: UUID;
}

export type CommandFunction<T extends object> = (
	command: T,
) => Promise<CommandIdResponse>;

export type Commands<DomainRequest extends CommandRequest> = {
	[C in DomainRequest as C['commandType']]: (
		command: C['command'],
	) => Promise<object>;
};

export interface IDomainCommands<DomainRequest extends CommandRequest> {
	domain: DomainRequest['domain'];
	commands: Commands<DomainRequest>;
}
