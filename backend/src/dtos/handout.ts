import type { UUID } from 'crypto';

export type HandoutType = 'Text' | 'Image' | 'File';

export interface HandoutStub {
	id: UUID;
	campaignId: UUID;
	name: string;
	type: HandoutType;
	source: string;
}
