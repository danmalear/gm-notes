import type { CampaignTemplate as CampaignTemplateDto } from '#dtos/models/CampaignTemplate.ts';
import type { DataResponse } from '#dtos/responses/DataResponse.ts';
import type { ErrorResponse } from '#dtos/responses/ErrorResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import {
	type CampaignTemplate,
	pkColumn,
	tableName,
} from '../entities/CampaignTemplate.ts';
import { getMessage } from '../helpers/error.ts';
import type { WithRequired } from '../helpers/types.ts';
import { isUUID } from '../helpers/uuid.ts';
import { Repository } from '../services/Repository.ts';

const campaignTemplateRepository = new Repository<CampaignTemplate>(
	tableName,
	pkColumn,
);

const apiNamespace = 'campaign-template';

export function campaignTemplateRoutes(app: Express) {
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

			const campaignTemplate = await campaignTemplateRepository.getById(
				req.params.id,
			);
			if (!campaignTemplate) {
				res.status(404).send({
					error: `Campaign Template with ID ${req.params.id} not found`,
				});
				return;
			}

			const dto: CampaignTemplateDto = {
				campaignTemplateId: campaignTemplate.CampaignTemplateId,
				name: campaignTemplate.Name,
			};

			res.send({ data: dto });
		},
	);

	type ValidPostBody = WithRequired<
		Omit<CampaignTemplateDto, 'campaignTemplateId'>,
		'name'
	>;

	function validatePostBody(body: unknown): body is ValidPostBody {
		if (!body) {
			throw Error('No request body supplied to POST request');
		}

		if (typeof body !== 'object') {
			throw Error('Request body is of an unsupported format');
		}

		if ('campaignTemplateId' in body && body.campaignTemplateId) {
			throw Error(
				'POST request received with UUID - either remove it if it should be a new record, or use PUT to update existing record',
			);
		}

		if (!('name' in body) || !body.name) {
			throw Error('Campaign Templates must have a name specified');
		}

		return true;
	}

	app.post(
		`/${apiNamespace}`,
		async (
			req: Request<object, ErrorResponse | DataResponse<CampaignTemplateDto>>,
			res,
		) => {
			console.log(
				`Campaign Template POST request received. body: ${JSON.stringify(req.body)}`,
			);

			try {
				if (!validatePostBody(req.body)) return;
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
					campaignTemplateId: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
				},
			});
		},
	);
}
