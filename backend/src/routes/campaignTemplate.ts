import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import type {
	CampaignTemplateCreate,
	CampaignTemplateResponse,
} from '#dtos/campaign-template.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import type { CampaignTemplate } from '../entities/CampaignTemplate.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import {
	requiredFields,
	validatePostBody,
} from '../helpers/validation/http.ts';
import {
	campaignTemplateRepository,
	mapTemplateRepository,
} from '../repositories.ts';

const apiNamespace = 'campaign-templates';

async function buildResponse(campaignTemplate: CampaignTemplate) {
	const mapTemplates = await mapTemplateRepository.getByCampaignTemplateId(
		campaignTemplate.CampaignTemplateId,
	);

	const campaignTemplateResponse: CampaignTemplateResponse = {
		id: campaignTemplate.CampaignTemplateId,
		name: campaignTemplate.Name,
		mapTemplates: mapTemplates.map((mapTemplate) => ({
			id: mapTemplate.MapTemplateId,
			campaignTemplateId: mapTemplate.CampaignTemplateId ?? undefined,
			name: mapTemplate.Name,
			imagePath: mapTemplate.ImagePath,
		})),
	};

	return campaignTemplateResponse;
}

export function campaignTemplateRoutes(app: Express) {
	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<CampaignTemplateResponse>>,
		) => {
			console.log(
				`Campaign Template GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const campaignTemplate = await campaignTemplateRepository.getById(
				req.params.id,
			);
			if (!campaignTemplate) {
				res.status(404).send({
					message: `Campaign Template with ID ${req.params.id} not found`,
				});
				return;
			}

			res.send({ data: await buildResponse(campaignTemplate) });
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<CampaignTemplateResponse>>,
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
				res.status(400).send({ message: getMessage(e) });
				return;
			}

			let campaignTemplate = {
				CampaignTemplateId: randomUUID(),
				Name: req.body.name,
			};

			campaignTemplate =
				await campaignTemplateRepository.insert(campaignTemplate);

			res.send({ data: await buildResponse(campaignTemplate) });
		},
	);
}
