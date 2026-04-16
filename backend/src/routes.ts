import { CampaignRoutes } from '#campaign/CampaignRoutes.ts';
import { CommandRoutes } from '#command/CommandRoutes.ts';
import { FileRoutes } from '#file/FileRoutes.ts';
import { MapRoutes } from '#map/MapRoutes.ts';
import { NarrationRoutes } from '#narration/NarrationRoutes.ts';
import { RegionRoutes } from '#region/RegionRoutes.ts';
import type { Express } from 'express';

export function routes(app: Express) {
	new CommandRoutes().init(app);
	new CampaignRoutes().init(app);
	new FileRoutes().init(app);
	new MapRoutes().init(app);
	new NarrationRoutes().init(app);
	new RegionRoutes().init(app);
}
