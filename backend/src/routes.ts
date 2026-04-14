import { CampaignRoutes } from '#campaign/CampaignRoutes.ts';
import { CommandRoutes } from '#command/CommandRoutes.ts';
import type { Express } from 'express';
import { fileRoutes } from './routes/file.ts';
import { mapRoutes } from './routes/map.ts';
import { narrationRoutes } from './routes/narration.ts';
import { regionRoutes } from './routes/region.ts';

export function routes(app: Express) {
	new CommandRoutes().init(app);
	new CampaignRoutes().init(app);
	fileRoutes(app);
	mapRoutes(app);
	regionRoutes(app);
	narrationRoutes(app);
}
