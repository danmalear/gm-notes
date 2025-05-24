import type { UUID } from 'crypto';

export interface CampaignTemplateCreate {
	name: string;
}

export interface CampaignTemplateUpdate {
	id: UUID;
	name?: string;
}

export interface CampaignTemplateResponse {
	id: UUID;
	name: string;
}
