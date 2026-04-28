import type { UUID } from 'crypto';

export type CommandFunction = (command: object) => Promise<UUID>;
