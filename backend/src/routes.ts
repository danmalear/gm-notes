import type { Express } from 'express';
import { campaignRoutes } from './routes/campaign.ts';
import { campaignTemplateRoutes } from './routes/campaignTemplate.ts';
import { fileRoutes } from './routes/file.ts';
import { mapRoutes } from './routes/map.ts';
import { mapTemplateRoutes } from './routes/mapTemplate.ts';
import { narrationRoutes } from './routes/narration.ts';
import { regionRoutes } from './routes/region.ts';

export function routes(app: Express) {
	campaignTemplateRoutes(app);
	campaignRoutes(app);
	fileRoutes(app);
	mapTemplateRoutes(app);
	mapRoutes(app);
	regionRoutes(app);
	narrationRoutes(app);
}
