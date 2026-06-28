import type { LocationItemIncludeMin } from '#item/location-item-repository.ts';
import { includeMin as locationItemIncludeMin } from '#item/location-item-repository.ts';
import type { ActionModel } from '#prisma-models/Action.ts';
import type { HandoutModel } from '#prisma-models/Handout.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import type { NoteModel } from '#prisma-models/Note.ts';
import type {
	RegionCreateInput,
	RegionInclude,
	RegionModel,
	RegionUpdateInput,
} from '#prisma-models/Region.ts';
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
import type { UUID } from 'crypto';

export interface RegionIncludeMin extends RegionModel {
	Shapes: RegionShapeModel[];
}

export const includeMin = {
	Shapes: true,
} satisfies RegionInclude;

export interface RegionNarrationIncludeMin extends RegionNarrationModel {
	Narration: NarrationModel;
}

const regionNarrationIncludeMin = {
	Narration: true,
} satisfies RegionNarrationInclude;

export interface RegionHandoutIncludeMin extends RegionHandoutModel {
	Handout: HandoutModel;
}

const regionHandoutIncludeMin = {
	Handout: true,
} satisfies RegionHandoutInclude;

export interface RegionIncludeAll extends RegionModel {
	Shapes: RegionShapeModel[];
	Narrations: RegionNarrationIncludeMin[];
	// Creatures: CreatureRec[];
	Actions: ActionModel[];
	Items: LocationItemIncludeMin[];
	Handouts: RegionHandoutIncludeMin[];
	Notes: NoteModel[];
}

export const includeAll = {
	Shapes: true,
	Narrations: {
		include: regionNarrationIncludeMin,
	},
	// Creatures: true;
	Actions: true,
	Items: {
		include: locationItemIncludeMin,
	},
	Handouts: {
		include: regionHandoutIncludeMin,
	},
	Notes: true,
} satisfies RegionInclude;

export interface IRegionRepository
	extends IRepository<
		RegionIncludeMin,
		RegionCreateInput,
		RegionUpdateInput,
		RegionIncludeAll
	> {
	getByMapId(mapId: UUID): Promise<RegionIncludeMin[]>;
}

export class RegionRepository
	extends Repository<
		RegionIncludeMin,
		RegionCreateInput,
		RegionUpdateInput,
		RegionIncludeAll
	>
	implements IRegionRepository
{
	override descriptor = 'Region';

	override async getByIdRaw(regionId: UUID): Promise<RegionIncludeMin | null> {
		try {
			return await this.prisma.region.findUnique({
				where: {
					RegionId: regionId,
				},
				include: includeMin,
			});
		} catch (e) {
			throw this.getByIdError(regionId, e);
		}
	}

	override async getById(regionId: UUID): Promise<RegionIncludeAll | null> {
		try {
			return await this.prisma.region.findUnique({
				where: {
					RegionId: regionId,
				},
				include: includeAll,
			});
		} catch (e) {
			throw this.getByIdError(regionId, e);
		}
	}

	override async getAll(): Promise<RegionIncludeMin[]> {
		try {
			return await this.prisma.region.findMany({
				include: includeMin,
			});
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: RegionCreateInput): Promise<RegionIncludeMin> {
		try {
			return await this.prisma.region.create({
				data,
				include: includeMin,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		regionId: UUID,
		data: RegionUpdateInput,
	): Promise<RegionIncludeMin> {
		try {
			return await this.prisma.region.update({
				where: {
					RegionId: regionId,
				},
				include: includeMin,
				data,
			});
		} catch (e) {
			throw this.updateError(regionId, e);
		}
	}

	/**
	 * Retrieves region records from the database for a given map ID
	 * @param mapId UUID of the map to get regions for
	 * @returns The list of regions (empty array if none found)
	 */
	async getByMapId(mapId: UUID): Promise<RegionIncludeMin[]> {
		try {
			const regions = await this.prisma.region.findMany({
				where: {
					MapId: mapId,
				},
				include: includeMin,
			});
			return regions;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Map ID ${mapId}: ${getMessage(e)}`,
			);
		}
	}
}
