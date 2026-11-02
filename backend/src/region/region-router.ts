import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, InternalError } from '#shared/error.ts';
import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import { isUUID } from '#shared/uuid.ts';
import { requiredFields, validatePostBody } from '#shared/validation/http.ts';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import type {
	RegionCreate,
	RegionQueryParams,
	RegionResponse,
	RegionStub,
} from './region-dtos.ts';
import { toDto, toStub } from './region-mappers.ts';
import type {
	IRegionRepository,
	RegionFull,
	RegionMin,
	RegionRaw,
} from './region-repository.ts';
import type { IRegionShapeRepository } from './region-shape-repository.ts';
import { getShapeType } from './region-shape-utils.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from './shape-validators.ts';

export interface RegionRouterOpts extends BaseStreamRouterOpts<
	RegionRaw,
	RegionMin,
	RegionFull,
	IRegionRepository
> {
	shapeRepository: IRegionShapeRepository;
}

export class RegionRouter extends BaseStreamRouter<
	RegionRaw,
	RegionMin,
	RegionFull,
	RegionResponse,
	RegionStub,
	IRegionRepository
> {
	shapeRepository: IRegionShapeRepository;

	constructor({
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		repository,
		shapeRepository,
	}: RegionRouterOpts) {
		super({
			app,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			repository,
			namespace: 'regions',
			descriptor: 'Region',
			descriptors: 'Regions',
		});
		this.shapeRepository = shapeRepository;
	}

	override toDto = toDto;

	override toStub = toStub;

	override get(): void {
		this.defaultGetById();

		this.app.get(
			`/${this.namespace}`,
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
					? await this.repository.getByMapId(req.query.mapId)
					: await this.repository.getAll();

				try {
					const data: RegionStub[] = regions.map(toStub);

					res.send({
						data,
					});
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);
	}

	override post(): void {
		this.app.post(
			`/${this.namespace}`,
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

				await this.repository.create({
					RegionId: id,
					RegionTemplateId: null,
					MapId: req.body.mapId,
					Name: req.body.name,
					Lighting: 'Default',
				});

				for (const shape of req.body.shapes) {
					await this.shapeRepository.create({
						RegionShapeId: randomUUID(),
						RegionId: id,
						ShapeType: getShapeType(shape),
						Coords: shape,
					});
				}

				const region = await this.repository.getByIdFull(id);
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
}
