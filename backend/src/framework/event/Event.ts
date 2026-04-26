import type { UUID } from 'crypto';

export const tableName = 'es_Event';
export const pkColumn = 'EventId';

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
