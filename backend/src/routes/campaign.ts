import type { CampaignCreate, CampaignResponse } from '#dtos/Campaign.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { ErrorResponse } from '#dtos/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type { Campaign } from '../entities/Campaign.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { requiredFields, validatePostBody } from '../helpers/validation.ts';
import { campaignRepository } from '../repositories.init.ts';

const apiNamespace = 'campaign';

const campaignRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<ErrorResponse | DataResponse<CampaignResponse>>,
		) => {
			console.log(
				`Campaign GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ error: 'Invalid UUID format' });
				return;
			}

			const campaign = await campaignRepository.getById(req.params.id);
			if (!campaign) {
				res.status(404).send({
					error: `Campaign with ID ${req.params.id} not found`,
				});
				return;
			}

			// @TODO fetch campaign template
			// @TODO fetch maps

			res.send({
				data: {
					id: campaign.CampaignId,
					name: campaign.Name,
					// @TODO campaignTemplate,
					// @TODO
					maps: [],
				},
			});
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req: Request<object, ErrorResponse | DataResponse<CampaignResponse>>,
			res,
		) => {
			console.log(
				`Campaign POST request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(body: unknown): asserts body is CampaignCreate {
				validatePostBody(body);
				requiredFields(body, ['name'], 'Campaigns must have a name specified');
			}

			try {
				validateBody(req.body);
			} catch (e) {
				res.status(400).send({ error: getMessage(e) });
				return;
			}

			let campaign: Campaign = {
				CampaignId: randomUUID(),
				CampaignTemplateId: req.body.campaignTemplateId ?? null,
				Name: req.body.name,
				ActiveMapId: null,
			};

			campaign = await campaignRepository.insert(campaign);

			// @TODO fetch campaign template
			// @TODO fetch maps

			res.send({
				data: {
					id: campaign.CampaignId,
					name: campaign.Name,
					// @TODO campaignTemplate,
					// @TODO
					maps: [],
				},
			});
		},
	);
};

export default campaignRoutes;
