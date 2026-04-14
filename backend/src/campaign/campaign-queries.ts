import type { CampaignTemplateStub } from '#dtos/campaign-template.ts';
import type { MapStub } from '#dtos/map.ts';
import type { UUID } from 'crypto';

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
