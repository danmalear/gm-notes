import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, InternalError } from '#shared/error.ts';
import { getById } from '#shared/route-utils.ts';
import { isUUID } from '#shared/uuid.ts';
import { isLighting } from '#shared/validation/data-types.ts';
import {
	requiredFields,
	validatePostBody,
	validatePutBody,
} from '#shared/validation/http.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type {
	MapCreate,
	MapQueryParams,
	MapResponse,
	MapStub,
	MapUpdate,
} from './map-dtos.ts';
import { toDto, toStub } from './map-mappers.ts';
import type { MapRec, MapRepository } from './map-repository.ts';

export function mapRoutes(
	app: Express,
	_commandBus: ICommandBus,
	_eventBus: IEventBus,
	mapRepository: MapRepository,
) {
	const apiNamespace = 'maps';

	app.get(
		`/${apiNamespace}`,
		async (
			req: Request<
				Record<string, never>,
				MessageResponse | DataResponse<MapStub[]>,
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

			const data: MapStub[] = [];

			try {
				for (const map of maps) {
					data.push(toStub(map));
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

	getById(app, {
		apiNamespace,
		objectDescriptor: 'Map',
		repository: mapRepository,
		toDto,
	});

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

			const map: MapRec = {
				MapId: randomUUID(),
				CampaignId: req.body.campaignId,
				Name: req.body.name,
				ImagePath: req.body.imagePath,
				MapTemplateId: null,
				DefaultLighting: req.body.defaultLighting ?? 'Bright Light',
				Width: req.body.width,
				Height: req.body.height,
			};

			await mapRepository.insert(map);

			const newMap = await mapRepository.getById(map.MapId);

			if (!newMap) {
				throw new InternalError('New map not found');
			}

			res.send({ data: toDto(newMap) });
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

			const map: Partial<MapRec> = {
				Name: req.body.name,
				ImagePath: req.body.imagePath,
				DefaultLighting: req.body.defaultLighting,
			};

			await mapRepository.update(req.body.id, map);

			const newMap = await mapRepository.getById(req.body.id);

			if (!newMap) {
				throw new InternalError('New map not found');
			}

			res.send({ data: toDto(newMap) });
		},
	);
}
