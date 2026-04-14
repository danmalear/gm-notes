import type { Express } from 'express';
import { campaignRoutes } from './routes/campaign.ts';
import { fileRoutes } from './routes/file.ts';
import { mapRoutes } from './routes/map.ts';
import { narrationRoutes } from './routes/narration.ts';
import { regionRoutes } from './routes/region.ts';

export function routes(app: Express) {
	campaignRoutes(app);
	fileRoutes(app);
	mapRoutes(app);
	regionRoutes(app);
	narrationRoutes(app);
}
