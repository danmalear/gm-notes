import type {
	CampaignTemplateCreate,
	CampaignTemplateResponse,
} from '#dtos/models/CampaignTemplate.ts';
import type { DataResponse } from '#dtos/responses/DataResponse.ts';
import type { ErrorResponse } from '#dtos/responses/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { validatePostBody } from '../helpers/validation.ts';
import { campaignTemplateRepository } from '../repositories.init.ts';

const apiNamespace = 'campaign-template';

export function campaignTemplateRoutes(app: Express) {
	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<ErrorResponse | DataResponse<CampaignTemplateResponse>>,
		) => {
			console.log(
				`Campaign Template GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ error: 'Invalid UUID format' });
				return;
			}

			const campaignTemplate = await campaignTemplateRepository.getById(
				req.params.id,
			);
			if (!campaignTemplate) {
				res.status(404).send({
					error: `Campaign Template with ID ${req.params.id} not found`,
				});
				return;
			}

			res.send({
				data: {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
				},
			});
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req: Request<
				object,
				ErrorResponse | DataResponse<CampaignTemplateResponse>
			>,
			res,
		) => {
			console.log(
				`Campaign Template POST request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(body: unknown): body is CampaignTemplateCreate {
				if (!validatePostBody(body)) return false;

				if (!('name' in body) || !body.name) {
					throw Error('Campaign Templates must have a name specified');
				}

				return true;
			}

			try {
				if (!validateBody(req.body)) return;
			} catch (e) {
				res.status(400).send({ error: getMessage(e) });
				return;
			}

			let campaignTemplate = {
				CampaignTemplateId: randomUUID(),
				Name: req.body.name,
			};

			campaignTemplate =
				await campaignTemplateRepository.insert(campaignTemplate);

			res.send({
				data: {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
				},
			});
		},
	);
}
