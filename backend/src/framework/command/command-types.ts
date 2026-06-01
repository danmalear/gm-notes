import type { UUID } from 'crypto';
import type { ICommand } from './command.ts';

export type CommandFunction = (
	command: ICommand,
	streamVersion?: number,
) => Promise<UUID>;
