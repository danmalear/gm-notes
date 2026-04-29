import type { UUID } from 'crypto';

export type MessageType = 'Command' | 'Event';

export interface IMessage<TType extends MessageType = MessageType> {
	type: TType;
	context: string;
	ref: string;
	streamId: UUID | undefined;
	streamVersion: number;
	data: object;
}
