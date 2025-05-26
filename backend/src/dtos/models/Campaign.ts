import type { UUID } from 'crypto';
import type { CampaignTemplateResponse } from './CampaignTemplate';

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
	campaignTemplate?: CampaignTemplateResponse;
	// @TODO activeMap?: Map;
}

export interface CampaignStub {
	id: UUID;
	name: string;
}
