import type { EventRec } from '#event/event-repository.ts';
import { randomUUID } from 'crypto';

const eventId = randomUUID();
const context = 'Context';
const ref = 'Occurred';
const streamId1 = randomUUID();
const correlationId = randomUUID();
const data = {
	prop1: 'string',
	prop2: 1,
};
const version = 0;
const occurredAt = new Date('01/01/2026').toUTCString();
export const event1: EventRec = {
	EventId: eventId,
	Context: context,
	Ref: ref,
	StreamId: streamId1,
	CorrelationId: correlationId,
	Data: data,
	Version: version,
	OccurredAt: occurredAt,
};
