import type { UUID } from 'crypto';

export type CommandFunction<T extends object> = (command: T) => Promise<UUID>;
