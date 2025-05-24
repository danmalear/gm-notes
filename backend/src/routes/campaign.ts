import type {
	CampaignCreate,
	CampaignResponse,
} from '#dtos/models/Campaign.ts';
import type { DataResponse } from '#dtos/responses/DataResponse.ts';
import type { ErrorResponse } from '#dtos/responses/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type { Campaign } from '../entities/Campaign.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { validatePostBody } from '../helpers/validation.ts';
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
			// @TODO fetch active map

			res.send({
				data: {
					id: campaign.CampaignId,
					name: campaign.Name,
					// @TODO campaignTemplate,
					// @TODO activeMap,
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

			function validateBody(body: unknown): body is CampaignCreate {
				if (!validatePostBody(body)) return false;

				if (!('name' in body) || !body.name) {
					throw Error('Campaigns must have a name specified');
				}

				return true;
			}

			try {
				if (!validateBody(req.body)) return;
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

			res.send({
				data: {
					id: campaign.CampaignId,
					name: campaign.Name,
					// @TODO campaignTemplate,
				},
			});
		},
	);
};

export default campaignRoutes;
