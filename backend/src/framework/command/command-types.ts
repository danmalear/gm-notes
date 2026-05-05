import type { UUID } from 'crypto';
import type { Command } from './Command.ts';

export type CommandFunction = (command: Command) => Promise<UUID>;
