import type { Express } from 'express';

const campaignTemplateRoutes = (app: Express, apiNamespace: string) => {
	app.get(`/${apiNamespace}/:id`, (req, res) => {
		res.send(`Campaign Template GET request received: ${req}`);
	});
};

export default campaignTemplateRoutes;
