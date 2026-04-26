import type { UUID } from 'crypto';

export interface Event {
	EventId: UUID;
	StreamId: UUID;
	CorrelationId: UUID;
	Context: string;
	Type: string;
	Version: number;
	Data: object;
	OccurredAt: string;
}
