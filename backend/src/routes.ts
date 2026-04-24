import { FileRoutes } from '#file/FileRoutes.ts';
import type { Express } from 'express';

export function routes(app: Express) {
	new FileRoutes().init(app);
}
