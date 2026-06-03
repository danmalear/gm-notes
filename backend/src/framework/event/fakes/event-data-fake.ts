import type { IEvent } from '#event/event.ts';
import type { EventModel } from '#prisma-models/Event.ts';
import { randomUUID } from 'crypto';

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
const occurredAt = new Date('01/01/2026');

export const fakeEvent: IEvent = {
	context,
	ref,
	streamId,
	correlationId,
	data,
	streamVersion: version,
};

export const fakeEventModel: EventModel = {
	EventId: eventId,
	Context: context,
	Ref: ref,
	StreamId: streamId,
	CorrelationId: correlationId,
	Data: data,
	Version: version,
	OccurredAt: occurredAt,
};
