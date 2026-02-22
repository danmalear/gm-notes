import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import type { RegionQueryParams, RegionResponse } from '#dtos/region.js';
import type { Express, Request, Response } from 'express';
import type { RegionWithShapes } from '../entities/Region.ts';
import { getMessage } from '../helpers/error.ts';
import { buildShapes } from '../helpers/region-shapes.ts';
import { isUUID } from '../helpers/uuid.ts';
import {
	itemRepository,
	mapRepository,
	narrationRepository,
	regionRepository,
} from '../repositories.ts';

const apiNamespace = 'regions';

async function buildResponse(region: RegionWithShapes) {
	const map = await mapRepository.getById(region.MapId);

	if (!map) {
		throw Error('Map for region not found.');
	}

	const narrations = await narrationRepository.getByRegionId(region.RegionId);
	const items = await itemRepository.getByLocationId(region.RegionId);

	const regionResponse: RegionResponse = {
		id: region.RegionId,
		name: region.Name,
		map: {
			id: map.MapId,
			mapTemplateId: map.MapTemplateId ?? undefined,
			campaignId: map.CampaignId,
			name: map.Name,
			imagePath: map.ImagePath,
		},
		// @TODO Region Templates
		regionTemplate: undefined,
		...buildShapes(region.RegionShapes),
		lighting: region.Lighting,
		narrations: narrations.map((entity) => ({
			id: entity.NarrationId,
			narrationTemplateId: entity.NarrationTemplateId ?? undefined,
			name: entity.Name,
			description: entity.Description,
			isRead: entity.IsRead,
		})),
		items: items.map((item) => ({
			id: item.LocationItemId,
			locationId: item.LocationId,
			itemId: item.ItemId,
			name: item.Name,
			isContainer: item.IsContainer,
			value:
				item.Value !== null
					? `${item.Value} ${item.ValueUnit ?? 'GP'}`
					: undefined,
			detailsLink: item.DetailsLink ?? undefined,
			quantity: item.Quantity,
		})),
	};

	return regionResponse;
}

export const regionRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}`,
		async (
			req: Request<
				Record<string, never>,
				MessageResponse | DataResponse<RegionResponse[]>,
				Record<string, never>,
				RegionQueryParams
			>,
			res,
		) => {
			console.log(
				`Region GET many request received. query: ${JSON.stringify(req.query)}`,
			);

			const regions = req.query.mapId
				? await regionRepository.getByMapId(req.query.mapId)
				: await regionRepository.getAll();

			const data: RegionResponse[] = [];

			try {
				for (const region of regions) {
					data.push(await buildResponse(region));
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
		async (
			req,
			res: Response<MessageResponse | DataResponse<RegionResponse>>,
		) => {
			console.log(
				`Region GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const region = await regionRepository.getById(req.params.id);
			if (!region) {
				res.status(404).send({
					message: `Region with ID ${req.params.id} not found`,
				});
				return;
			}

			try {
				res.send({ data: await buildResponse(region) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);
};
