import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';

export type ICommandSubscriber = IMessageSubscriber<'Command'>;
