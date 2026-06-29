import type { StreamModel } from '#prisma-models/Stream.ts';
import { randomUUID } from 'crypto';

const streamId = randomUUID();
const streamType = 'Object';
const version = 0;
const createdAt = new Date('01/01/2026');
const updatedAt = new Date('01/02/2026');

export const fakeStreamModel: StreamModel = {
	StreamId: streamId,
	Type: streamType,
	Version: version,
	CreatedAt: createdAt,
	UpdatedAt: updatedAt,
};
