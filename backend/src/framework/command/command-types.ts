import type { UUID } from 'crypto';
import type { Command } from './command.ts';

export type CommandFunction = (
	command: Command,
	streamVersion?: number,
) => Promise<UUID>;
