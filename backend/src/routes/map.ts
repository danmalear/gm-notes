import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MapCreate, MapQueryParams, MapResponse } from '#dtos/Map.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type { Map } from '../entities/Map.ts';
import { getMessage } from '../helpers/error.ts';
import { buildShapes } from '../helpers/region-shapes.ts';
import { isUUID } from '../helpers/uuid.ts';
import { requiredFields, validatePostBody } from '../helpers/validation.ts';
import {
	campaignRepository,
	mapRepository,
	mapTemplateRepository,
	regionRepository,
} from '../repositories/repositories.ts';

const apiNamespace = 'maps';

async function buildResponse(map: Map) {
	const campaign = await campaignRepository.getById(map.CampaignId);

	if (!campaign) {
		throw Error('Campaign for map not found.');
	}

	const mapTemplate = map.MapTemplateId
		? await mapTemplateRepository.getById(map.MapTemplateId)
		: undefined;

	const regions = await regionRepository.getByMapId(map.MapId);

	const mapResponse: MapResponse = {
		id: map.MapId,
		name: map.Name,
		imagePath: map.ImagePath,
		campaign: {
			id: campaign.CampaignId,
			name: campaign.Name,
			activeMapId: campaign.ActiveMapId ?? undefined,
			campaignTemplateId: campaign.CampaignTemplateId ?? undefined,
		},
		mapTemplate: mapTemplate
			? {
					id: mapTemplate.MapTemplateId,
					name: mapTemplate.Name,
					imagePath: mapTemplate.ImagePath,
					campaignTemplateId: mapTemplate.CampaignTemplateId ?? undefined,
				}
			: undefined,
		regions: regions.map((region) => {
			return {
				id: region.RegionId,
				name: region.Name,
				...buildShapes(region.RegionShapes),
			};
		}),
	};

	return mapResponse;
}

export const mapRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}`,
		async (
			req: Request<
				Record<string, never>,
				MessageResponse | DataResponse<MapResponse[]>,
				Record<string, never>,
				MapQueryParams
			>,
			res,
		) => {
			console.log(
				`Map GET many request received. query: ${JSON.stringify(req.query)}`,
			);

			const maps = req.query.campaignId
				? await mapRepository.getByCampaignId(req.query.campaignId)
				: await mapRepository.getAll();

			const data: MapResponse[] = [];

			try {
				for (const map of maps) {
					data.push(await buildResponse(map));
				}
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}

			res.send({
				data,
			});
		},
	);

	app.get(
		`/${apiNamespace}/:id`,
		async (req, res: Response<MessageResponse | DataResponse<MapResponse>>) => {
			console.log(
				`Map GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const map = await mapRepository.getById(req.params.id);
			if (!map) {
				res.status(404).send({
					message: `Map with ID ${req.params.id} not found`,
				});
				return;
			}

			try {
				res.send({ data: await buildResponse(map) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);

	app.post(
		`/${apiNamespace}`,
		async (req, res: Response<MessageResponse | DataResponse<MapResponse>>) => {
			console.log(
				`Map POST request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(body: unknown): asserts body is MapCreate {
				validatePostBody(body);
				requiredFields(body, ['campaignId', 'name', 'imagePath']);
				if (typeof body.campaignId !== 'string' || !isUUID(body.campaignId)) {
					throw Error('Campaign ID is in an invalid format');
				}
				if (
					'mapTemplateId' in body &&
					body.mapTemplateId &&
					(typeof body.mapTemplateId !== 'string' ||
						!isUUID(body.mapTemplateId))
				) {
					throw Error('Map template ID is in an invalid format');
				}
			}

			try {
				validateBody(req.body);
			} catch (e) {
				res.status(400).send({ message: getMessage(e) });
				return;
			}

			let map: Map = {
				MapId: randomUUID(),
				CampaignId: req.body.campaignId,
				Name: req.body.name,
				ImagePath: req.body.imagePath,
				MapTemplateId: req.body.mapTemplateId ?? null,
				DefaultLighting: req.body.defaultLighting ?? 'Bright Light',
			};

			map = await mapRepository.insert(map);

			res.send({ data: await buildResponse(map) });
		},
	);
};
