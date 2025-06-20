import type { Express } from 'express';
import { campaignRoutes } from './campaign.ts';
import { campaignTemplateRoutes } from './campaignTemplate.ts';
import { fileRoutes } from './file.ts';
import { mapRoutes } from './map.ts';
import { mapTemplateRoutes } from './mapTemplate.ts';

export function routes(app: Express) {
	campaignTemplateRoutes(app);
	campaignRoutes(app);
	fileRoutes(app);
	mapTemplateRoutes(app);
	mapRoutes(app);
}
