import { randomUUID, type UUID } from 'crypto';
import type { Express, Request, Response } from 'express';
import type { AbilityCheckStub } from '../dtos/ability-check.ts';
import type { ActionStub } from '../dtos/action.ts';
import type { DataResponse } from '../dtos/DataResponse.ts';
import type { LocationItemStub } from '../dtos/item.ts';
import type { MessageResponse } from '../dtos/MessageResponse.ts';
import type {
	RegionCreate,
	RegionQueryParams,
	RegionResponse,
} from '../dtos/region.ts';
import type { Region } from '../entities/Region.ts';
import { getMessage } from '../helpers/error.ts';
import { buildShapes, getShapeType } from '../helpers/region-shapes.ts';
import { isUUID } from '../helpers/uuid.ts';
import {
	requiredFields,
	validatePostBody,
} from '../helpers/validation/http.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from '../helpers/validation/shapes.ts';
import {
	abilityCheckRepository,
	actionRepository,
	conditionRepository,
	handoutRepository,
	itemRepository,
	mapRepository,
	narrationRepository,
	noteRepository,
	regionRepository,
	regionShapeRepository,
} from '../repositories.ts';

const apiNamespace = 'regions';

// #region Response building
// @TODO this should really not all live in the region file

async function buildItems(locationId: UUID) {
	const items = await itemRepository.getByLocationId(locationId);
	const dtoItems: LocationItemStub[] = [];
	for (const item of items) {
		const itemActions = await buildActions(item.ItemId);
		const locationItemActions = await buildActions(item.LocationItemId);
		const actions = [...itemActions, ...locationItemActions];

		const itemNotes = await noteRepository.getByEntityId(item.ItemId);
		const locationItemNotes = await noteRepository.getByEntityId(
			item.LocationItemId,
		);
		const notes = [...itemNotes, ...locationItemNotes];
		if (item.IsContainer) {
			const dtoContainedItems = await buildItems(item.LocationItemId);
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

async function buildActions(targetId: UUID) {
	const actions = await actionRepository.getByTargetId(targetId);
	const dtoActions: ActionStub[] = [];
	for (const action of actions) {
		const abilityChecks = await buildAbilityChecks(action.ActionId);
		const conditions = await conditionRepository.getByActionId(action.ActionId);
		// const notes = await noteRepository.getByEntityId(action.ActionId);
		const narration = action.NarrationId
			? await narrationRepository.getById(action.NarrationId)
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

async function buildAbilityChecks(actionId: UUID) {
	const abilityChecks = await abilityCheckRepository.getByActionId(actionId);
	const dtoChecks: AbilityCheckStub[] = [];
	for (const check of abilityChecks) {
		const successNarration = check.SuccessNarrationId
			? await narrationRepository.getById(check.SuccessNarrationId)
			: undefined;
		const critSuccessNarration = check.CriticalSuccessNarrationId
			? await narrationRepository.getById(check.CriticalSuccessNarrationId)
			: undefined;
		const failureNarration = check.FailureNarrationId
			? await narrationRepository.getById(check.FailureNarrationId)
			: undefined;
		const critFailureNarration = check.CriticalFailureNarrationId
			? await narrationRepository.getById(check.CriticalFailureNarrationId)
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

async function buildResponse(region: Region) {
	const map = await mapRepository.getById(region.MapId);

	if (!map) {
		throw Error('Map for region not found.');
	}

	const shapes = await buildShapes(region.RegionId);
	const narrations = await narrationRepository.getByRegionId(region.RegionId);
	const items = await buildItems(region.RegionId);
	const actions = await buildActions(region.RegionId);
	const handouts = await handoutRepository.getByRegionId(region.RegionId);

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
		// @TODO Templates
		regionTemplate: undefined,
		shapes,
		lighting: region.Lighting,
		narrations: narrations.map((entity) => ({
			id: entity.NarrationId,
			narrationTemplateId: entity.NarrationTemplateId ?? undefined,
			name: entity.Name,
			description: entity.Description,
			isRead: entity.IsRead,
		})),
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

			const region = await regionRepository.insert({
				RegionId: randomUUID(),
				//@ TODO templates
				RegionTemplateId: null,
				MapId: req.body.mapId,
				Name: req.body.name,
				Lighting: 'Default',
			});

			for (const shape of req.body.shapes) {
				await regionShapeRepository.insert({
					RegionShapeId: randomUUID(),
					RegionId: region.RegionId,
					ShapeType: getShapeType(shape),
					Coords: JSON.stringify(shape),
				});
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
