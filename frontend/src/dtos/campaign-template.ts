import type { UUID } from 'crypto';
import type { MapTemplateStub } from './map-template.ts';

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
	mapTemplates: MapTemplateStub[];
}

export interface CampaignTemplateStub {
	id: UUID;
	name: string;
}
