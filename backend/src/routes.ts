import { FileRoutes } from '#file/FileRoutes.ts';
import { RegionRoutes } from '#region/region-routes.ts';
import type { Express } from 'express';

export function routes(app: Express) {
	new FileRoutes().init(app);
	new RegionRoutes().init(app);
}
