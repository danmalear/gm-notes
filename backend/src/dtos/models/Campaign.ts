import type { UUID } from 'crypto';

export interface Campaign {
	campaignId?: UUID;
	campaignTemplateId?: UUID;
	name?: string;
	activeMapId?: UUID;
	campaignTemplateName?: string;
	activeMapUrl?: string;
}
