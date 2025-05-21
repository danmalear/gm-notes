import type { CampaignTemplate as CampaignTemplateDto } from '#dtos/models/CampaignTemplate.ts';
import type { DataResponse } from '#dtos/responses/DataResponse.ts';
import type { ErrorResponse } from '#dtos/responses/ErrorResponse.ts';
import type { Express, Request, Response } from 'express';
import { CampaignTemplate } from '../entities/CampaignTemplate.ts';
import { isUUID } from '../helpers/uuid.ts';
import { CampaignTemplateService } from '../services/CampaignTemplateService.ts';

const service = CampaignTemplateService.getInstance();

const campaignTemplateRoutes = (app: Express, apiNamespace: string) => {
	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<ErrorResponse | DataResponse<CampaignTemplateDto>>,
		) => {
			console.log(
				`Campaign Template GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ error: 'Invalid UUID format' });
				return;
			}
			const campaignTemplate = await service.getById(req.params.id);
			console.log('getById', JSON.stringify(campaignTemplate));
			if (!campaignTemplate) {
				res.status(404).send({
					error: `Campaign Template with ID ${req.params.id} not found`,
				});
				return;
			}
			res.send({ data: campaignTemplate.toDto() });
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req: Request<
				object,
				ErrorResponse | DataResponse<CampaignTemplateDto>,
				CampaignTemplateDto | undefined
			>,
			res,
		) => {
			console.log(
				`Campaign Template POST request received. body: ${JSON.stringify(req.body)}`,
			);

			if (!req.body || req.body.campaignTemplateId) {
				res.status(400).send({ error: 'Request malformed' });
				return;
			}
			const campaignTemplate = await service.insert(
				CampaignTemplate.fromDto(req.body),
			);

			res.send({ data: campaignTemplate.toDto() });
		},
	);
};

export default campaignTemplateRoutes;
