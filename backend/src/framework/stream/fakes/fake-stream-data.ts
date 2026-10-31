import { randomUUID } from 'crypto';
import type { StreamMin } from '../stream-repository.ts';

const streamId = randomUUID();
const streamType = 'Object';
const version = 0;
const createdAt = new Date('01/01/2026');
const updatedAt = new Date('01/02/2026');

export const fakeStreamModel: StreamMin = {
	StreamId: streamId,
	Type: streamType,
	Version: version,
	CreatedAt: createdAt,
	UpdatedAt: updatedAt,
};
