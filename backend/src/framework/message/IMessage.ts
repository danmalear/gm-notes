import type { ICloneable } from '#shared/ICloneable.ts';
import type { UUID } from 'crypto';

export type MessageType = 'Command' | 'Event';

export interface IMessage<TType extends MessageType = MessageType>
	extends ICloneable<IMessage<TType>> {
	type: TType;
	context: string;
	ref: string;
	streamId: UUID | undefined;
	correlationId: UUID;
	streamVersion: number | undefined;
	data: object;
}
