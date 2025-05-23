import type { Express } from 'express';
import { campaignTemplateRoutes } from './campaignTemplate';

export function routes(app: Express) {
	campaignTemplateRoutes(app);
}
