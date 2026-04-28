import type { ICommandBus } from '#command/CommandBus.ts';
import type { IEventBus } from '#event/EventBus.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, InternalError } from '#shared/error.ts';
import { getById } from '#shared/route-utils.ts';
import { isUUID } from '#shared/uuid.ts';
import { requiredFields, validatePostBody } from '#shared/validation/http.ts';
import { randomUUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type {
	RegionCreate,
	RegionQueryParams,
	RegionResponse,
	RegionStub,
} from './region-dtos.ts';
import { toDto, toStub } from './region-mappers.ts';
import type { RegionRepository } from './region-repository.ts';
import type { RegionShapeRepository } from './region-shape-repository.ts';
import { getShapeType } from './region-shape-utils.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from './shape-validators.ts';

export function regionRoutes(
	app: Express,
	_commandBus: ICommandBus,
	_eventBus: IEventBus,
	regionRepository: RegionRepository,
	regionShapeRepository: RegionShapeRepository,
) {
	const apiNamespace = 'regions';

	app.get(
		`/${apiNamespace}`,
		async (
			req: Request<
				Record<string, never>,
				MessageResponse | DataResponse<RegionStub[]>,
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

			const data: RegionStub[] = [];

			try {
				for (const region of regions) {
					data.push(toStub(region));
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
		objectDescriptor: 'Region',
		repository: regionRepository,
		toDto,
	});

	app.post(
		`/${apiNamespace}`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<RegionResponse>>,
		) => {
			console.log(
				`Region POST request received. body: ${JSON.stringify(req.body)}`,
			);

			function validateBody(body: unknown): asserts body is RegionCreate {
				validatePostBody(body);
				requiredFields(body, ['name', 'mapId', 'shapes']);

				// @TODO require length
				if (typeof body.name !== 'string' /* || body.name.length <= 0 */) {
					throw Error('Region name is in an invalid format');
				}

				if (typeof body.mapId !== 'string' || !isUUID(body.mapId)) {
					throw Error('Map ID is in an invalid format');
				}

				if (!Array.isArray(body.shapes)) {
					throw Error('Shape array is in an invalid format');
				}

				for (const shape of body.shapes) {
					if ('x1' in shape) {
						validateRectangle(shape);
					} else if ('r' in shape) {
						validateCircle(shape);
					} else if ('coords' in shape) {
						validatePolygon(shape);
					} else {
						throw Error('Invalid shape provided');
					}
				}

				// @TODO the other properties as they're implemented
			}

			try {
				validateBody(req.body);
			} catch (e) {
				res.status(400).send({ message: getMessage(e) });
				return;
			}

			const id = randomUUID();

			await regionRepository.insert({
				RegionId: id,
				RegionTemplateId: null,
				MapId: req.body.mapId,
				Name: req.body.name,
				Lighting: 'Default',
			});

			for (const shape of req.body.shapes) {
				await regionShapeRepository.insert({
					RegionShapeId: randomUUID(),
					RegionId: id,
					ShapeType: getShapeType(shape),
					Coords: shape,
				});
			}

			const region = await regionRepository.getById(id);
			if (!region) throw new InternalError('Newly created region not found.');

			try {
				res.send({ data: toDto(region) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);
}
