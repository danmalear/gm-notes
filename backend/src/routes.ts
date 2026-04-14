import { CampaignRoutes } from '#campaign/CampaignRoutes.ts';
import { CommandRoutes } from '#command/CommandRoutes.ts';
import { fileRoutes } from '#file/file-routes.ts';
import { mapRoutes } from '#map/map-routes.ts';
import { regionRoutes } from '#region/region-routes.ts';
import type { Express } from 'express';
import { narrationRoutes } from './routes/narration.ts';

export function routes(app: Express) {
	new CommandRoutes().init(app);
	new CampaignRoutes().init(app);
	fileRoutes(app);
	mapRoutes(app);
	regionRoutes(app);
	narrationRoutes(app);
}
