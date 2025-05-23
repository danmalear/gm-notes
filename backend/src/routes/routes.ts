import type { Express } from 'express';
import { campaignTemplateRoutes } from './campaignTemplate.ts';

export function routes(app: Express) {
	campaignTemplateRoutes(app);
}
