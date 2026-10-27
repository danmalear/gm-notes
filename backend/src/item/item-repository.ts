import type {
	ActionMin,
	IActionTargetIncludeMin,
} from '#action/action-repository.ts';
import { db } from '#db';
import type { FileMin } from '#file/file-repository.ts';
import type { INoteEntityIncludeMin, NoteMin } from '#note/note-repository.ts';
import type { Models } from '#prisma';
import type { FileModel } from '#prisma-models/File.ts';
import type { IItemLocationModel } from '#prisma-models/IItemLocation.ts';
import type { ItemInclude, ItemModel } from '#prisma-models/Item.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';
import type { LocationItemIncludeMin } from './location-item-repository.ts';

export type ItemMin = Scalars<Models.public_Item>;

export type ItemFull = ItemMin & {
	ImageFile: FileMin | null;
	Actions: ActionMin[];
	Notes: NoteMin[];
};

/** @deprecated */
export interface IItemLocationIncludeMin extends IItemLocationModel {
	Items: LocationItemIncludeMin[];
}

/** @deprecated */
export interface ItemIncludeAll extends ItemModel {
	ImageFile: FileModel | null;
	IActionTarget: IActionTargetIncludeMin;
	INoteEntity: INoteEntityIncludeMin;
}

/** @deprecated */
export const includeAll = {
	ImageFile: true,
	IActionTarget: {
		include: {
			Actions: true,
		},
	},
	INoteEntity: {
		include: {
			Notes: true,
		},
	},
} satisfies ItemInclude;

export type IItemRepository = IRepository<ItemMin, ItemMin, ItemMin, ItemFull>;

export class ItemRepository
	extends Repository<ItemMin, ItemMin, ItemMin, ItemFull>
	implements IItemRepository
{
	override descriptor = 'Item';

	override async getByIdRaw(itemId: UUID): Promise<ItemMin | null> {
		try {
			return await db.orm.public.Item.first({
				ItemId: itemId,
			});
		} catch (e) {
			throw this.getByIdError(itemId, e);
		}
	}

	override async getById(itemId: UUID): Promise<ItemFull | null> {
		try {
			const item = await db.orm.public.Item.include('ImageFile')
				.include('IActionTarget', (actionTarget) =>
					actionTarget.include('Actions'),
				)
				.include('INoteEntity', (noteEntity) => noteEntity.include('Notes'))
				.first({
					ItemId: itemId,
				});

			if (!item) return null;

			return {
				...item,
				Actions: item.IActionTarget?.Actions ?? [],
				Notes: item.INoteEntity?.Notes ?? [],
			};
		} catch (e) {
			throw this.getByIdError(itemId, e);
		}
	}

	override async getAll(): Promise<ItemMin[]> {
		try {
			return await db.orm.public.Item.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ItemMin): Promise<ItemMin> {
		try {
			return await db.orm.public.Item.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		itemId: UUID,
		data: Partial<ItemMin>,
	): Promise<ItemMin | null> {
		try {
			return await db.orm.public.Item.where({
				ItemId: itemId,
			}).update(data);
		} catch (e) {
			throw this.updateError(itemId, e);
		}
	}
}
