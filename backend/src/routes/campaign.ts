import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import type {
	CampaignCreate,
	CampaignResponse,
} from '#dtos/src/dtos/campaign.js';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import type { Campaign } from '../entities/Campaign.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import {
	requiredFields,
	validatePostBody,
} from '../helpers/validation/http.ts';
import {
	campaignRepository,
	campaignTemplateRepository,
	mapRepository,
} from '../repositories.ts';

const apiNamespace = 'campaigns';

async function buildResponse(campaign: Campaign) {
	const campaignTemplate = campaign.CampaignTemplateId
		? await campaignTemplateRepository.getById(campaign.CampaignTemplateId)
		: undefined;

	const maps = await mapRepository.getByCampaignId(campaign.CampaignId);

	const campaignResponse: CampaignResponse = {
		id: campaign.CampaignId,
		name: campaign.Name,
		activeMapId: campaign.ActiveMapId ?? undefined,
		campaignTemplate: campaignTemplate
			? {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
				}
			: undefined,
		maps: maps.map((map) => ({
			id: map.MapId,
			campaignId: map.CampaignId,
			mapTemplateId: map.MapTemplateId ?? undefined,
			name: map.Name,
			imagePath: map.ImagePath,
		})),
	};

	return campaignResponse;
}

export const campaignRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}`,
		async (
			_req,
			res: Response<MessageResponse | DataResponse<CampaignResponse[]>>,
		) => {
			console.log(`Campaign GET all request received.`);

			const campaigns = await campaignRepository.getAll();

			const data: CampaignResponse[] = [];

			for (const campaign of campaigns) {
				data.push(await buildResponse(campaign));
			}

			res.send({
				data,
			});
		},
	);

	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<CampaignResponse>>,
		) => {
			console.log(
				`Campaign GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const campaign = await campaignRepository.getById(req.params.id);
			if (!campaign) {
				res.status(404).send({
					message: `Campaign with ID ${req.params.id} not found`,
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
			res: Response<MessageResponse | DataResponse<CampaignResponse>>,
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
				res.status(400).send({ message: getMessage(e) });
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
