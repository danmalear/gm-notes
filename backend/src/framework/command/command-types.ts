import type { UUID } from 'crypto';
import type { Command } from './command-temp.ts';

export type CommandFunction = (
	command: Command,
	streamVersion?: number,
) => Promise<UUID>;
