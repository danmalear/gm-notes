import { FileRoutes } from '#file/file-routes.ts';
import type { Express } from 'express';

export function routes(app: Express) {
	new FileRoutes().init(app);
}
