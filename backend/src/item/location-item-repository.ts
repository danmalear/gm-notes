import type { ActionModel } from '#prisma-models/Action.ts';
import type { ItemModel } from '#prisma-models/Item.ts';
import type {
	LocationItemCreateInput,
	LocationItemInclude,
	LocationItemModel,
	LocationItemUpdateInput,
} from '#prisma-models/LocationItem.ts';
import type { NoteModel } from '#prisma-models/Note.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';
import {
	includeAll as itemIncludeAll,
	type ItemIncludeAll,
} from './item-repository.ts';

export interface LocationItemIncludeMin extends LocationItemModel {
	Item: ItemModel;
}

export const includeMin = {
	Item: true,
} satisfies LocationItemInclude;

export interface LocationItemIncludeAll extends LocationItemModel {
	Actions: ActionModel[];
	Contents: LocationItemIncludeMin[];
	Item: ItemIncludeAll;
	Notes: NoteModel[];
}

const includeAll = {
	Actions: true,
	Contents: {
		include: includeMin,
	},
	Item: {
		include: itemIncludeAll,
	},
	Notes: true,
} satisfies LocationItemInclude;

export interface ILocationItemRepository
	extends IRepository<
		LocationItemIncludeMin,
		LocationItemCreateInput,
		LocationItemUpdateInput,
		LocationItemIncludeAll
	> {
	getByLocationId(locationId: UUID): Promise<LocationItemIncludeMin[]>;
}

export class LocationItemRepository
	extends Repository<
		LocationItemIncludeMin,
		LocationItemCreateInput,
		LocationItemUpdateInput,
		LocationItemIncludeAll
	>
	implements ILocationItemRepository
{
	override descriptor = 'Location Item';

	override async getByIdRaw(
		locationItemId: UUID,
	): Promise<LocationItemIncludeMin | null> {
		try {
			return await this.prisma.locationItem.findUnique({
				where: {
					LocationItemId: locationItemId,
				},
				include: includeMin,
			});
		} catch (e) {
			throw this.getByIdError(locationItemId, e);
		}
	}

	override async getById(
		locationItemId: UUID,
	): Promise<LocationItemIncludeAll | null> {
		try {
			return await this.prisma.locationItem.findUnique({
				where: {
					LocationItemId: locationItemId,
				},
				include: includeAll,
			});
		} catch (e) {
			throw this.getByIdError(locationItemId, e);
		}
	}

	override async getAll(): Promise<LocationItemIncludeMin[]> {
		try {
			return await this.prisma.locationItem.findMany({
				include: includeMin,
			});
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(
		data: LocationItemCreateInput,
	): Promise<LocationItemIncludeMin> {
		try {
			return await this.prisma.locationItem.create({
				data,
				include: includeMin,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		locationItemId: UUID,
		data: LocationItemUpdateInput,
	): Promise<LocationItemIncludeMin> {
		try {
			return await this.prisma.locationItem.update({
				where: {
					LocationItemId: locationItemId,
				},
				include: includeMin,
				data,
			});
		} catch (e) {
			throw this.updateError(locationItemId, e);
		}
	}

	/**
	 * Retrieves item records from the database for a given location ID
	 * @param id UUID of the location to get items for
	 * @returns The list of items (empty array if none found)
	 */
	async getByLocationId(locationId: UUID): Promise<LocationItemIncludeMin[]> {
		try {
			const locationItems = await this.prisma.locationItem.findMany({
				where: {
					LocationId: locationId,
				},
				include: includeMin,
			});
			return locationItems;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Location ID ${locationId}: ${getMessage(e)}`,
			);
		}
	}
}
