import type {
	CampaignTemplateCreate,
	CampaignTemplateResponse,
} from '#dtos/CampaignTemplate.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { ErrorResponse } from '#dtos/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { requiredFields, validatePostBody } from '../helpers/validation.ts';
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

			// @TODO fetch map templates associated with campaign template

			res.send({
				data: {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
					// @TODO
					mapTemplates: [],
				},
			});
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req,
			res: Response<ErrorResponse | DataResponse<CampaignTemplateResponse>>,
		) => {
			console.log(
				`Campaign Template POST request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(
				body: unknown,
			): asserts body is CampaignTemplateCreate {
				validatePostBody(body);
				requiredFields(
					body,
					['name'],
					'Campaign Templates must have a name specified',
				);
			}

			try {
				validateBody(req.body);
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

			// @TODO fetch map templates associated with campaign template

			res.send({
				data: {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
					// @TODO
					mapTemplates: [],
				},
			});
		},
	);
}
