import type { RegionStub } from '#region/region-dtos.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { isLighting } from '#shared/validation/data-types.ts';
import {
	requiredFields,
	validatePostBody,
	validatePutBody,
} from '#shared/validation/http.ts';
import { randomUUID, type UUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import { getMessage } from '../../helpers/error.ts';
import { buildShapes } from '../../helpers/region-shapes.ts';
import { isUUID } from '../../helpers/uuid.ts';
import {
	campaignRepository,
	mapRepository,
	regionRepository,
} from '../../repositories.ts';
import type {
	MapCreate,
	MapQueryParams,
	MapResponse,
	MapUpdate,
} from './map-dtos.ts';
import type { Map } from './Map.ts';

const apiNamespace = 'maps';

// @TODO the "build" functions ought to be extracted somewhere like buildShapes

async function buildRegions(mapId: UUID) {
	const regions = await regionRepository.getByMapId(mapId);
	const dtoRegions: RegionStub[] = [];

	for (const region of regions) {
		const shapes = await buildShapes(region.RegionId);

		dtoRegions.push({
			id: region.RegionId,
			mapId: region.MapId,
			name: region.Name,
			shapes,
		});
	}

	return dtoRegions;
}

async function buildResponse(map: Map) {
	const campaign = await campaignRepository.getById(map.CampaignId);

	if (!campaign) {
		throw Error('Campaign for map not found.');
	}

	const regions = await buildRegions(map.MapId);

	const mapResponse: MapResponse = {
		id: map.MapId,
		name: map.Name,
		imagePath: map.ImagePath,
		defaultLighting: map.DefaultLighting,
		width: map.Width,
		height: map.Height,
		campaign: {
			id: campaign.CampaignId,
			name: campaign.Name,
			activeMapId: campaign.ActiveMapId ?? undefined,
		},
		regions,
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
				requiredFields(body, [
					'campaignId',
					'name',
					'imagePath',
					'width',
					'height',
				]);
				if (typeof body.campaignId !== 'string' || !isUUID(body.campaignId)) {
					throw Error('Campaign ID is in an invalid format');
				}
				if (typeof body.width !== 'number') {
					throw Error('Map width is in an invalid format');
				}
				if (typeof body.height !== 'number') {
					throw Error('Map height is in an invalid format');
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
				MapTemplateId: null,
				DefaultLighting: req.body.defaultLighting ?? 'Bright Light',
				Width: req.body.width,
				Height: req.body.height,
			};

			map = await mapRepository.insert(map);

			res.send({ data: await buildResponse(map) });
		},
	);

	app.put(
		`/${apiNamespace}`,
		async (req, res: Response<MessageResponse | DataResponse<MapResponse>>) => {
			console.log(
				`Map PUT request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(body: unknown): asserts body is MapUpdate {
				validatePutBody(body);
				if (
					'name' in body &&
					body.name !== undefined &&
					typeof body.name !== 'string'
				) {
					throw Error('Map name is in an invalid format');
				}
				if (
					'defaultLighting' in body &&
					body.defaultLighting !== undefined &&
					(typeof body.defaultLighting !== 'string' ||
						!isLighting(body.defaultLighting))
				) {
					throw Error('Map default lighting is an invalid value');
				}
			}

			try {
				validateBody(req.body);
			} catch (e) {
				res.status(400).send({ message: getMessage(e) });
				return;
			}

			const map: Partial<Map> = {
				Name: req.body.name,
				ImagePath: req.body.imagePath,
				DefaultLighting: req.body.defaultLighting,
			};

			const updatedMap = await mapRepository.update(req.body.id, map);

			res.send({ data: await buildResponse(updatedMap) });
		},
	);
};
