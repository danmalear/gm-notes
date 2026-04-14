import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import {
	requiredFields,
	validatePostBody,
} from '../helpers/validation/http.ts';
import { mapRepository } from '../repositories.ts';
import type { CreateCampaign } from './campaign-commands.ts';
import type { CampaignResponse, CampaignStub } from './campaign-queries.ts';
import type { Campaign } from './Campaign.ts';
import { CampaignRepository } from './CampaignRepository.ts';

export class CampaignRoutes {
	static readonly apiNamespace = 'campaigns';

	campaignRepository: CampaignRepository;

	constructor() {
		this.campaignRepository = new CampaignRepository();
	}

	static async buildResponse(campaign: Campaign) {
		const maps = await mapRepository.getByCampaignId(campaign.CampaignId);

		const campaignResponse: CampaignResponse = {
			id: campaign.CampaignId,
			name: campaign.Name,
			activeMapId: campaign.ActiveMapId ?? undefined,
			maps: maps.map((map) => ({
				id: map.MapId,
				campaignId: map.CampaignId,
				name: map.Name,
				imagePath: map.ImagePath,
			})),
		};

		return campaignResponse;
	}

	static async buildStub(campaign: Campaign) {
		const campaignStub: CampaignStub = {
			id: campaign.CampaignId,
			name: campaign.Name,
			activeMapId: campaign.ActiveMapId ?? undefined,
		};

		return campaignStub;
	}

	init(app: Express) {
		app.get(
			`/${CampaignRoutes.apiNamespace}`,
			async (
				_req,
				res: Response<MessageResponse | DataResponse<CampaignResponse[]>>,
			) => {
				console.log(`Campaign GET all request received.`);

				const campaigns = await this.campaignRepository.getAll();

				const data: CampaignResponse[] = [];

				for (const campaign of campaigns) {
					data.push(await CampaignRoutes.buildResponse(campaign));
				}

				res.send({
					data,
				});
			},
		);

		app.get(
			`/${CampaignRoutes.apiNamespace}/:id`,
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

				const campaign = await this.campaignRepository.getById(req.params.id);
				if (!campaign) {
					res.status(404).send({
						message: `Campaign with ID ${req.params.id} not found`,
					});
					return;
				}

				res.send({ data: await CampaignRoutes.buildResponse(campaign) });
			},
		);

		app.post(
			`/${CampaignRoutes.apiNamespace}`,
			async (
				req,
				res: Response<MessageResponse | DataResponse<CampaignResponse>>,
			) => {
				console.log(
					`Campaign POST request received. body: ${JSON.stringify(req.body)}`,
				);

				function validateBody(body: unknown): asserts body is CreateCampaign {
					validatePostBody(body);
					requiredFields(
						body,
						['name'],
						'Campaigns must have a name specified',
					);
				}

				try {
					validateBody(req.body);
				} catch (e) {
					res.status(400).send({ message: getMessage(e) });
					return;
				}

				let campaign: Campaign = {
					CampaignId: randomUUID(),
					CampaignTemplateId: null,
					Name: req.body.name,
					ActiveMapId: null,
				};

				campaign = await this.campaignRepository.insert(campaign);

				res.send({ data: await CampaignRoutes.buildResponse(campaign) });
			},
		);
	}
}
