import type { Campaign as CampaignDto } from '#dtos/models/Campaign.ts';
import type { DataResponse } from '#dtos/responses/DataResponse.ts';
import type { ErrorResponse } from '#dtos/responses/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import { getMessage } from '../helpers/error.ts';
import { WithRequired } from '../helpers/types.ts';
import { isUUID } from '../helpers/uuid.ts';
import { campaignRepository } from '../repositories.init.ts';

const apiNamespace = 'campaign';

const campaignRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}/:id`,
		async (req, res: Response<ErrorResponse | DataResponse<CampaignDto>>) => {
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
					campaignId: campaign.CampaignId,
					campaignTemplateId: campaign.CampaignTemplateId ?? undefined,
					name: campaign.Name,
					activeMapId: campaign.ActiveMapId ?? undefined,
				},
			});
		},
	);

	type ValidPostBody = WithRequired<Omit<CampaignDto, 'campaignId'>, 'name'>;

	function validatePostBody(body: unknown): body is ValidPostBody {
		if (!body) {
			throw Error('No request body supplied to POST request');
		}

		if (typeof body !== 'object') {
			throw Error('Request body is of an unsupported format');
		}

		if ('campaignId' in body && body.campaignId) {
			throw Error(
				'POST request received with UUID - either remove it if it should be a new record, or use PUT to update existing record',
			);
		}

		if (!('name' in body) || !body.name) {
			throw Error('Campaigns must have a name specified');
		}

		return true;
	}

	app.post(
		`/${apiNamespace}`,
		async (
			req: Request<object, ErrorResponse | DataResponse<CampaignDto>>,
			res,
		) => {
			console.log(
				`Campaign POST request received. body: ${JSON.stringify(req.body)}`,
			);

			try {
				if (!validatePostBody(req.body)) return;
			} catch (e) {
				res.status(400).send({ error: getMessage(e) });
				return;
			}

			let campaign = {
				CampaignId: randomUUID(),
				CampaignTemplateId: req.body.campaignTemplateId ?? null,
				Name: req.body.name,
				ActiveMapId: null,
			};

			campaign = await campaignRepository.insert(campaign);

			res.send({
				data: {
					campaignId: campaign.CampaignId,
					campaignTemplateId: campaign.CampaignTemplateId ?? undefined,
					name: campaign.Name,
				},
			});
		},
	);
};

export default campaignRoutes;
