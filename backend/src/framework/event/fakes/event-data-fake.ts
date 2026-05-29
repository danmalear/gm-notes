import { randomUUID } from 'crypto';
import type { EventRec } from '../event-repository.ts';
import { Event } from '../event.ts';

const eventId = randomUUID();
const context = 'Context';
const ref = 'Occurred';
const streamId = randomUUID();
const correlationId = randomUUID();
const data = {
	prop1: 'string',
	prop2: 1,
};
const version = 0;
const occurredAt = new Date('01/01/2026').toUTCString();

export const fakeEvent = new Event({
	context,
	ref,
	streamId,
	correlationId,
	data,
	streamVersion: version,
});

export const fakeEventRec: EventRec = {
	EventId: eventId,
	Context: context,
	Ref: ref,
	StreamId: streamId,
	CorrelationId: correlationId,
	Data: data,
	Version: version,
	OccurredAt: occurredAt,
};
