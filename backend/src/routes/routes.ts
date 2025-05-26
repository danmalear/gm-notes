import type { Express } from 'express';
import { campaignRoutes } from './campaign.ts';
import { campaignTemplateRoutes } from './campaignTemplate.ts';

export function routes(app: Express) {
	campaignTemplateRoutes(app);
	campaignRoutes(app);
}
