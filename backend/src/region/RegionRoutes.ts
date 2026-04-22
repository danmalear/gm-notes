import type { AbilityCheckStub } from '#ability-check/ability-check-dtos.ts';
import { AbilityCheckRepository } from '#ability-check/AbilityCheckRepository.ts';
import type { ActionStub } from '#action/action-dtos.ts';
import { ActionRepository } from '#action/ActionRepository.ts';
import { ConditionRepository } from '#condition/ConditionRepository.ts';
import { HandoutRepository } from '#handout/HandoutRepository.ts';
import type { LocationItemStub } from '#item/item-dtos.ts';
import { ItemRepository } from '#item/ItemRepository.ts';
import { MapRepository } from '#map/MapRepository.ts';
import { toStub as narrationToStub } from '#narration/narration-mapper.ts';
import { NarrationRepository } from '#narration/NarrationRepository.ts';
import { NoteRepository } from '#note/NoteRepository.ts';
import type {
	RegionCreate,
	RegionQueryParams,
	RegionResponse,
} from '#region/region-dtos.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { requiredFields, validatePostBody } from '#shared/validation/http.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from '#shared/validation/shapes.ts';
import { randomUUID, type UUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import { buildShapes, getShapeType } from './region-shape-utils.ts';
import type { RegionRaw } from './Region.ts';
import { RegionRepository } from './RegionRepository.ts';
import { RegionShapeRepository } from './RegionShapeRepository.ts';

export class RegionRoutes {
	static readonly apiNamespace = 'regions';

	abilityCheckRepository: AbilityCheckRepository;
	actionRepository: ActionRepository;
	conditionRepository: ConditionRepository;
	handoutRepository: HandoutRepository;
	itemRepository: ItemRepository;
	mapRepository: MapRepository;
	narrationRepository: NarrationRepository;
	noteRepository: NoteRepository;
	regionRepository: RegionRepository;
	regionShapeRepository: RegionShapeRepository;

	constructor() {
		this.abilityCheckRepository = new AbilityCheckRepository();
		this.actionRepository = new ActionRepository();
		this.conditionRepository = new ConditionRepository();
		this.handoutRepository = new HandoutRepository();
		this.itemRepository = new ItemRepository();
		this.regionRepository = new RegionRepository();
		this.regionShapeRepository = new RegionShapeRepository();
		this.mapRepository = new MapRepository(
			this.regionRepository,
			this.regionShapeRepository,
		);
		this.narrationRepository = new NarrationRepository();
		this.noteRepository = new NoteRepository();
	}

	// #region Response building
	// @TODO this should really not all live in the region file

	async buildItems(locationId: UUID) {
		const items = await this.itemRepository.getByLocationId(locationId);
		const dtoItems: LocationItemStub[] = [];
		for (const item of items) {
			const itemActions = await this.buildActions(item.ItemId);
			const locationItemActions = await this.buildActions(item.LocationItemId);
			const actions = [...itemActions, ...locationItemActions];

			const itemNotes = await this.noteRepository.getByEntityId(item.ItemId);
			const locationItemNotes = await this.noteRepository.getByEntityId(
				item.LocationItemId,
			);
			const notes = [...itemNotes, ...locationItemNotes];
			if (item.IsContainer) {
				const dtoContainedItems = await this.buildItems(item.LocationItemId);
				dtoItems.push({
					id: item.LocationItemId,
					locationId: item.LocationId,
					itemId: item.ItemId,
					name: item.Name,
					value:
						item.Value !== null
							? `${item.Value} ${item.ValueUnit ?? 'GP'}`
							: undefined,
					detailsLink: item.DetailsLink ?? undefined,
					imageFileId: item.ImageFileId ?? undefined,
					quantity: item.Quantity,
					actions,
					notes: notes.map((note) => note.Description),
					isContainer: true,
					containedItems: dtoContainedItems,
				});
			} else {
				dtoItems.push({
					id: item.LocationItemId,
					locationId: item.LocationId,
					itemId: item.ItemId,
					name: item.Name,
					value:
						item.Value !== null
							? `${item.Value} ${item.ValueUnit ?? 'GP'}`
							: undefined,
					detailsLink: item.DetailsLink ?? undefined,
					imageFileId: item.ImageFileId ?? undefined,
					quantity: item.Quantity,
					actions,
					notes: notes.map((note) => note.Description),
					isContainer: false,
				});
			}
		}
		return dtoItems;
	}

	async buildActions(targetId: UUID) {
		const actions = await this.actionRepository.getByTargetId(targetId);
		const dtoActions: ActionStub[] = [];
		for (const action of actions) {
			const abilityChecks = await this.buildAbilityChecks(action.ActionId);
			const conditions = await this.conditionRepository.getByActionId(
				action.ActionId,
			);
			// const notes = await noteRepository.getByEntityId(action.ActionId);
			const narration = action.NarrationId
				? await this.narrationRepository.getById(action.NarrationId)
				: undefined;
			dtoActions.push({
				id: action.ActionId,
				targetId: action.TargetId,
				name: action.Name,
				type: action.Type ?? undefined,
				narration: narration?.Description,
				conditions: conditions.map((condition) => condition.Description),
				abilityChecks,
				// @TODO
				// notes: [],
			});
		}
		return dtoActions;
	}

	async buildAbilityChecks(actionId: UUID) {
		const abilityChecks =
			await this.abilityCheckRepository.getByActionId(actionId);
		const dtoChecks: AbilityCheckStub[] = [];
		for (const check of abilityChecks) {
			const successNarration = check.SuccessNarrationId
				? await this.narrationRepository.getById(check.SuccessNarrationId)
				: undefined;
			const critSuccessNarration = check.CriticalSuccessNarrationId
				? await this.narrationRepository.getById(
						check.CriticalSuccessNarrationId,
					)
				: undefined;
			const failureNarration = check.FailureNarrationId
				? await this.narrationRepository.getById(check.FailureNarrationId)
				: undefined;
			const critFailureNarration = check.CriticalFailureNarrationId
				? await this.narrationRepository.getById(
						check.CriticalFailureNarrationId,
					)
				: undefined;
			dtoChecks.push({
				id: check.AbilityCheckId,
				actionId: check.ActionId,
				skill: check.Skill,
				dc: check.DC,
				successNarration: successNarration?.Description,
				criticalSuccessNarration: critSuccessNarration?.Description,
				failureNarration: failureNarration?.Description,
				criticalFailureNarration: critFailureNarration?.Description,
			});
		}
		return dtoChecks;
	}

	async buildResponse(region: RegionRaw) {
		const map = await this.mapRepository.getById(region.MapId);

		if (!map) {
			throw Error('Map for region not found.');
		}

		const regionShapes = await this.regionShapeRepository.getByRegionId(
			region.RegionId,
		);
		const shapes = await buildShapes(regionShapes);
		const narrations = await this.narrationRepository.getByRegionId(
			region.RegionId,
		);
		const items = await this.buildItems(region.RegionId);
		const actions = await this.buildActions(region.RegionId);
		const handouts = await this.handoutRepository.getByRegionId(
			region.RegionId,
		);

		const regionResponse: RegionResponse = {
			id: region.RegionId,
			name: region.Name,
			map: {
				id: map.MapId,
				campaignId: map.CampaignId,
				name: map.Name,
				imagePath: map.ImagePath,
			},
			shapes,
			lighting: region.Lighting,
			narrations: narrations.map(narrationToStub),
			actions,
			items,
			handouts: handouts.map((handout) => ({
				id: handout.HandoutId,
				campaignId: handout.CampaignId,
				name: handout.Name,
				type: handout.Type,
				source: handout.Source,
			})),
		};

		return regionResponse;
	}
	// #endregion

	init(app: Express) {
		app.get(
			`/${RegionRoutes.apiNamespace}`,
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
					? await this.regionRepository.getByMapId(req.query.mapId)
					: await this.regionRepository.getAll();

				const data: RegionResponse[] = [];

				try {
					for (const region of regions) {
						data.push(await this.buildResponse(region));
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
			`/${RegionRoutes.apiNamespace}/:id`,
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

				const region = await this.regionRepository.getById(req.params.id);
				if (!region) {
					res.status(404).send({
						message: `Region with ID ${req.params.id} not found`,
					});
					return;
				}

				try {
					res.send({ data: await this.buildResponse(region) });
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);

		app.post(
			`/${RegionRoutes.apiNamespace}`,
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

				const region = await this.regionRepository.insert({
					RegionId: randomUUID(),
					RegionTemplateId: null,
					MapId: req.body.mapId,
					Name: req.body.name,
					Lighting: 'Default',
				});

				for (const shape of req.body.shapes) {
					await this.regionShapeRepository.insert({
						RegionShapeId: randomUUID(),
						RegionId: region.RegionId,
						ShapeType: getShapeType(shape),
						Coords: shape,
					});
				}

				try {
					res.send({ data: await this.buildResponse(region) });
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);
	}
}
