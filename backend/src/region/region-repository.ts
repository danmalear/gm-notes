import type {
	ActionMin,
	IActionTargetIncludeMin,
} from '#action/action-repository.ts';
import { db } from '#db';
import type { HandoutMin } from '#handout/handout-repository.ts';
import type { IItemLocationIncludeMin } from '#item/item-repository.ts';
import type { LocationItemMin } from '#item/location-item-repository.ts';
import { includeMin as locationItemIncludeMin } from '#item/location-item-repository.ts';
import type { NarrationMin } from '#narration/narration-repository.ts';
import type { INoteEntityIncludeMin, NoteMin } from '#note/note-repository.ts';
import type { Models } from '#prisma';
import type { HandoutModel } from '#prisma-models/Handout.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import type { RegionInclude, RegionModel } from '#prisma-models/Region.ts';
import type {
	RegionHandoutInclude,
	RegionHandoutModel,
} from '#prisma-models/RegionHandout.ts';
import type {
	RegionNarrationInclude,
	RegionNarrationModel,
} from '#prisma-models/RegionNarration.ts';
import type { RegionShapeModel } from '#prisma-models/RegionShape.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';
import type { RegionShapeMin } from './region-shape-repository.ts';

export type RegionRaw = Scalars<Models.public_Region>;

export interface RegionMin extends RegionRaw {
	Shapes: RegionShapeMin[];
}

export interface RegionFull extends RegionMin {
	Narrations: NarrationMin[];
	Actions: ActionMin[];
	Items: LocationItemMin[];
	Handouts: HandoutMin[];
	Notes: NoteMin[];
}

/** @deprecated */
export interface RegionIncludeMin extends RegionModel {
	Shapes: RegionShapeModel[];
}

/** @deprecated */
export const includeMin = {
	Shapes: true,
} satisfies RegionInclude;

/** @deprecated */
export interface RegionNarrationIncludeMin extends RegionNarrationModel {
	Narration: NarrationModel;
}

/** @deprecated */
const regionNarrationIncludeMin = {
	Narration: true,
} satisfies RegionNarrationInclude;

/** @deprecated */
export interface RegionHandoutIncludeMin extends RegionHandoutModel {
	Handout: HandoutModel;
}

/** @deprecated */
const regionHandoutIncludeMin = {
	Handout: true,
} satisfies RegionHandoutInclude;

/** @deprecated */
export interface RegionIncludeAll extends RegionModel {
	Shapes: RegionShapeModel[];
	Narrations: RegionNarrationIncludeMin[];
	IActionTarget: IActionTargetIncludeMin;
	IItemLocation: IItemLocationIncludeMin;
	Handouts: RegionHandoutIncludeMin[];
	INoteEntity: INoteEntityIncludeMin;
}

/** @deprecated */
export const includeAll = {
	Shapes: true,
	Narrations: {
		include: regionNarrationIncludeMin,
	},
	IActionTarget: {
		include: {
			Actions: true,
		},
	},
	IItemLocation: {
		include: {
			Items: {
				include: locationItemIncludeMin,
			},
		},
	},
	Handouts: {
		include: regionHandoutIncludeMin,
	},
	INoteEntity: {
		include: {
			Notes: true,
		},
	},
} satisfies RegionInclude;

export interface IRegionRepository
	extends IRepository<RegionMin, RegionRaw, RegionRaw, RegionFull> {
	getByMapId(mapId: UUID): Promise<RegionMin[]>;
}

export class RegionRepository
	extends Repository<RegionMin, RegionRaw, RegionRaw, RegionFull>
	implements IRegionRepository
{
	override descriptor = 'Region';

	override async getByIdRaw(regionId: UUID): Promise<RegionMin | null> {
		try {
			return await db.orm.public.Region.include('Shapes').first({
				RegionId: regionId,
			});
		} catch (e) {
			throw this.getByIdError(regionId, e);
		}
	}

	override async getById(regionId: UUID): Promise<RegionFull | null> {
		try {
			const region = await db.orm.public.Region.include('Shapes')
				.include('Narrations', (regionNarration) =>
					regionNarration.include('Narration'),
				)
				.include('IActionTarget', (iActionTarget) =>
					iActionTarget.include('Actions'),
				)
				.include('IItemLocation', (iItemLocation) =>
					iItemLocation.include('Items', (locationItem) =>
						locationItem.include('Item'),
					),
				)
				.include('Handouts', (regionHandout) =>
					regionHandout.include('Handout'),
				)
				.include('INoteEntity', (iNoteEntity) => iNoteEntity.include('Notes'))
				.first({
					RegionId: regionId,
				});

			if (!region) return null;

			return {
				...region,
				Narrations: region.Narrations.map(
					(regionNarration) => regionNarration.Narration,
				),
				Actions: region.IActionTarget?.Actions ?? [],
				Items: region.IItemLocation?.Items ?? [],
				Handouts: region.Handouts.map((regionHandout) => regionHandout.Handout),
				Notes: region.INoteEntity?.Notes ?? [],
			};
		} catch (e) {
			throw this.getByIdError(regionId, e);
		}
	}

	override async getAll(): Promise<RegionMin[]> {
		try {
			return await db.orm.public.Region.include('Shapes').all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: RegionRaw): Promise<RegionMin> {
		try {
			await db.orm.public.IActionTarget.create({
				IActionTargetId: data.RegionId,
				Type: 'Region',
			});
			await db.orm.public.IItemLocation.create({
				IItemLocationId: data.RegionId,
				Type: 'Region',
			});
			await db.orm.public.INoteEntity.create({
				INoteEntityId: data.RegionId,
				Type: 'Region',
			});
			return await db.orm.public.Region.include('Shapes').create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		regionId: UUID,
		data: Partial<RegionRaw>,
	): Promise<RegionMin | null> {
		try {
			return await db.orm.public.Region.include('Shapes')
				.where({
					RegionId: regionId,
				})
				.update(data);
		} catch (e) {
			throw this.updateError(regionId, e);
		}
	}

	/**
	 * Retrieves region records from the database for a given map ID
	 * @param mapId UUID of the map to get regions for
	 * @returns The list of regions (empty array if none found)
	 */
	async getByMapId(mapId: UUID): Promise<RegionMin[]> {
		try {
			const regions = await db.orm.public.Region.include('Shapes')
				.where({
					MapId: mapId,
				})
				.all();
			return regions;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Map ID ${mapId}: ${getMessage(e)}`,
			);
		}
	}
}
