import type {
	ActionMin,
	IActionTargetIncludeMin,
} from '#action/action-repository.ts';
import { db } from '#db';
import type { INoteEntityIncludeMin, NoteMin } from '#note/note-repository.ts';
import type { Models } from '#prisma';
import type { ItemModel } from '#prisma-models/Item.ts';
import type {
	LocationItemInclude,
	LocationItemModel,
} from '#prisma-models/LocationItem.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';
import type {
	IItemLocationIncludeMin,
	ItemFull,
	ItemIncludeAll,
	ItemMin,
} from './item-repository.ts';

export type LocationItemRaw = Scalars<Models.public_LocationItem>;

export type LocationItemMin = LocationItemRaw & {
	Item: ItemMin;
};

export type LocationItemFull = LocationItemMin & {
	Item: ItemFull;
	Actions: ActionMin[];
	Contents: LocationItemMin[];
	Notes: NoteMin[];
};

/** @deprecated */
export interface LocationItemIncludeMin extends LocationItemModel {
	Item: ItemModel;
}

/** @deprecated */
export const includeMin = {
	Item: true,
} satisfies LocationItemInclude;

/** @deprecated */
export interface LocationItemIncludeAll extends LocationItemModel {
	IActionTarget: IActionTargetIncludeMin;
	IItemLocation: IItemLocationIncludeMin;
	Item: ItemIncludeAll;
	INoteEntity: INoteEntityIncludeMin;
}

export interface ILocationItemRepository
	extends IRepository<
		LocationItemMin,
		LocationItemRaw,
		LocationItemRaw,
		LocationItemFull
	> {
	getByLocationId(locationId: UUID): Promise<LocationItemIncludeMin[]>;
}

export class LocationItemRepository
	extends Repository<
		LocationItemMin,
		LocationItemRaw,
		LocationItemRaw,
		LocationItemFull
	>
	implements ILocationItemRepository
{
	override descriptor = 'Location Item';

	override async getByIdRaw(
		locationItemId: UUID,
	): Promise<LocationItemMin | null> {
		try {
			return await db.orm.public.LocationItem.include('Item').first({
				LocationItemId: locationItemId,
			});
		} catch (e) {
			throw this.getByIdError(locationItemId, e);
		}
	}

	override async getById(
		locationItemId: UUID,
	): Promise<LocationItemFull | null> {
		try {
			const locationItem = await db.orm.public.LocationItem.include(
				'Item',
				(item) =>
					item
						.include('ImageFile')
						.include('IActionTarget', (iActionTarget) =>
							iActionTarget.include('Actions'),
						)
						.include('INoteEntity', (iNoteEntity) =>
							iNoteEntity.include('Notes'),
						),
			)
				.include('IActionTarget', (iActionTarget) =>
					iActionTarget.include('Actions'),
				)
				.include('IItemLocation', (iItemLocation) =>
					iItemLocation.include('Items', (item) => item.include('Item')),
				)
				.include('INoteEntity', (iNoteEntity) => iNoteEntity.include('Notes'))
				.first({
					LocationItemId: locationItemId,
				});

			if (!locationItem || !locationItem.Item) return null;

			return {
				...locationItem,
				Item: {
					...locationItem.Item,
					Actions: locationItem.Item.IActionTarget?.Actions ?? [],
					Notes: locationItem.Item.INoteEntity?.Notes ?? [],
				},
				Actions: locationItem.IActionTarget?.Actions ?? [],
				Contents: locationItem.IItemLocation?.Items ?? [],
				Notes: locationItem.INoteEntity?.Notes ?? [],
			};
		} catch (e) {
			throw this.getByIdError(locationItemId, e);
		}
	}

	override async getAll(): Promise<LocationItemMin[]> {
		try {
			return await db.orm.public.LocationItem.include('Item').all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: LocationItemRaw): Promise<LocationItemMin> {
		try {
			return await db.orm.public.LocationItem.include('Item').create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		locationItemId: UUID,
		data: Partial<LocationItemRaw>,
	): Promise<LocationItemMin | null> {
		try {
			return await db.orm.public.LocationItem.include('Item')
				.where({
					LocationItemId: locationItemId,
				})
				.update(data);
		} catch (e) {
			throw this.updateError(locationItemId, e);
		}
	}

	/**
	 * Retrieves item records from the database for a given location ID
	 * @param id UUID of the location to get items for
	 * @returns The list of items (empty array if none found)
	 */
	async getByLocationId(locationId: UUID): Promise<LocationItemMin[]> {
		try {
			const locationItems = await db.orm.public.LocationItem.include('Item')
				.where({
					LocationId: locationId,
				})
				.all();
			return locationItems;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Location ID ${locationId}: ${getMessage(e)}`,
			);
		}
	}
}
