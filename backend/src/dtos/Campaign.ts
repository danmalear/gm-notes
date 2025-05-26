import type { UUID } from 'crypto';
import type { CampaignTemplateStub } from './CampaignTemplate.ts';
import type { MapStub } from './Map.ts';

export interface CampaignCreate {
	campaignTemplateId?: UUID;
	name: string;
}

export interface CampaignUpdate {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface CampaignResponse {
	id: UUID;
	name: string;
	activeMapId?: UUID;
	campaignTemplate?: CampaignTemplateStub;
	maps: MapStub[];
}

export interface CampaignStub {
	id: UUID;
	campaignTemplateId?: UUID;
	name: string;
	activeMapId?: UUID;
}
