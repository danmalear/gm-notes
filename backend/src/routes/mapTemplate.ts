import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import type {
	MapTemplateCreate,
	MapTemplateQueryParams,
	MapTemplateResponse,
} from '#dtos/map-template.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type { MapTemplate } from '../entities/MapTemplate.ts';
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

const apiNamespace = 'map-templates';

async function buildResponse(mapTemplate: MapTemplate) {
	const campaignTemplate = mapTemplate.CampaignTemplateId
		? await campaignTemplateRepository.getById(mapTemplate.CampaignTemplateId)
		: undefined;

	const mapTemplateResponse: MapTemplateResponse = {
		id: mapTemplate.MapTemplateId,
		name: mapTemplate.Name,
		imagePath: mapTemplate.ImagePath,
		campaignTemplate: campaignTemplate
			? {
					id: campaignTemplate.CampaignTemplateId,
					name: campaignTemplate.Name,
				}
			: undefined,
	};

	return mapTemplateResponse;
}

export const mapTemplateRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}`,
		async (
			req: Request<
				Record<string, never>,
				DataResponse<MapTemplateResponse[]>,
				Record<string, never>,
				MapTemplateQueryParams
			>,
			res,
		) => {
			console.log(
				`Map template GET many request received. query: ${req.query}`,
			);

			const mapTemplates = req.query.campaignTemplateId
				? await mapTemplateRepository.getByCampaignTemplateId(
						req.query.campaignTemplateId,
					)
				: await mapTemplateRepository.getAll();

			const data: MapTemplateResponse[] = [];

			for (const mapTemplate of mapTemplates) {
				data.push(await buildResponse(mapTemplate));
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
			res: Response<MessageResponse | DataResponse<MapTemplateResponse>>,
		) => {
			console.log(
				`Map template GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const mapTemplate = await mapTemplateRepository.getById(req.params.id);
			if (!mapTemplate) {
				res.status(404).send({
					message: `Map template with ID ${req.params.id} not found`,
				});
				return;
			}

			res.send({ data: await buildResponse(mapTemplate) });
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<MapTemplateResponse>>,
		) => {
			console.log(
				`Map template POST request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(body: unknown): asserts body is MapTemplateCreate {
				validatePostBody(body);
				requiredFields(body, ['name', 'imagePath']);
				if (
					'campaignTemplateId' in body &&
					body.campaignTemplateId &&
					(typeof body.campaignTemplateId !== 'string' ||
						!isUUID(body.campaignTemplateId))
				) {
					throw Error('Campaign template ID is in an invalid format');
				}
			}

			try {
				validateBody(req.body);
			} catch (e) {
				res.status(400).send({ message: getMessage(e) });
				return;
			}

			let mapTemplate: MapTemplate = {
				MapTemplateId: randomUUID(),
				CampaignTemplateId: req.body.campaignTemplateId ?? null,
				Name: req.body.name,
				ImagePath: req.body.imagePath,
			};

			mapTemplate = await mapTemplateRepository.insert(mapTemplate);

			res.send({ data: await buildResponse(mapTemplate) });
		},
	);
};
