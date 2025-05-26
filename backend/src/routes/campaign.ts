import type { CampaignCreate, CampaignResponse } from '#dtos/Campaign.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { ErrorResponse } from '#dtos/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import type { Campaign } from '../entities/Campaign.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { requiredFields, validatePostBody } from '../helpers/validation.ts';
import {
	campaignRepository,
	campaignTemplateRepository,
} from '../repositories.init.ts';

const apiNamespace = 'campaign';

async function buildResponse(campaign: Campaign) {
	const campaignTemplate = campaign.CampaignTemplateId
		? await campaignTemplateRepository.getById(campaign.CampaignTemplateId)
		: undefined;

	// @TODO fetch maps

	const campaignResponse: CampaignResponse = {
		id: campaign.CampaignId,
		name: campaign.Name,
		campaignTemplate: campaignTemplate
			? {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
				}
			: undefined,
		// @TODO
		maps: [],
	};

	return campaignResponse;
}

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

			res.send({ data: await buildResponse(campaign) });
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req,
			res: Response<ErrorResponse | DataResponse<CampaignResponse>>,
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

			res.send({ data: await buildResponse(campaign) });
		},
	);
};

export default campaignRoutes;
