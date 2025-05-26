import type { UUID } from 'crypto';
import type { CampaignStub } from './Campaign.ts';
import type { MapTemplateStub } from './MapTemplate.ts';

export interface MapCreate {
	campaignId: UUID;
	mapTemplateId?: UUID;
	name: string;
	imagePath: string;
}

export interface MapUpdate {
	id: UUID;
	name?: string;
	imagePath?: string;
}

export interface MapResponse {
	id: UUID;
	name: string;
	imagePath: string;
	campaign: CampaignStub;
	mapTemplate?: MapTemplateStub;
}

export interface MapStub {
	id: UUID;
	name: string;
	imagePath: string;
}
