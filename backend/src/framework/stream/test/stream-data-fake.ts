import { randomUUID } from 'crypto';
import type { StreamRec } from '../stream-repository.ts';

const streamId = randomUUID();
const streamType = 'Object';
const version = 0;
const createdAt = new Date('01/01/2026').toUTCString();
const updatedAt = new Date('01/02/2026').toUTCString();

export const fakeStream: StreamRec = {
	StreamId: streamId,
	Type: streamType,
	Version: version,
	CreatedAt: createdAt,
	UpdatedAt: updatedAt,
};
