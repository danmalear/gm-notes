import type { UUID } from 'crypto';
import type { CampaignTemplateStub } from './CampaignTemplate.ts';

export interface MapTemplateCreate {
	campaignTemplateId?: UUID;
	name: string;
	imagePath: string;
}

export interface MapTemplateUpdate {
	id: UUID;
	name?: string;
	imagePath?: string;
}

export interface MapTemplateResponse {
	id: UUID;
	name: string;
	imagePath: string;
	campaignTemplate?: CampaignTemplateStub;
}

export interface MapTemplateStub {
	id: UUID;
	name: string;
	imagePath: string;
}
