import type { UUID } from 'crypto';

export interface NarrationQueryParams {
	regionId?: UUID;
}

export interface NarrationResponse {
	id: UUID;
	name: string;
	description: string;
	isRead: boolean;
}

export interface NarrationStub {
	id: UUID;
	name: string;
	isRead: boolean;
}
