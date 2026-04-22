import { FileRoutes } from '#file/FileRoutes.ts';
import { NarrationRoutes } from '#narration/NarrationRoutes.ts';
import { RegionRoutes } from '#region/RegionRoutes.ts';
import type { Express } from 'express';

export function routes(app: Express) {
	new FileRoutes().init(app);
	new NarrationRoutes().init(app);
	new RegionRoutes().init(app);
}
