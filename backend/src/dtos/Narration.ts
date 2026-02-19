import type { UUID } from 'crypto';

export interface NarrationQueryParams {
	regionId?: UUID;
}

export interface NarrationResponse {
	id: UUID;
	// @TODO
	narrationTemplate?: undefined;
	name: string;
	description: string;
	isRead: boolean;
}

export interface NarrationStub {
	id: UUID;
	descriptionTemplateId?: UUID;
	name: string;
	description: string;
	isRead: boolean;
}
