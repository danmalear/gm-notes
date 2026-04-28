import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Command } from './Command.ts';

export type ICommandSubscriber = IMessageSubscriber<'Command', Command>;
