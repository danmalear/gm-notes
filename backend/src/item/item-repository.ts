import type { ActionMin } from '#action/action-repository.ts';
import { db } from '#db';
import type { FileMin } from '#file/file-repository.ts';
import type { NoteMin } from '#note/note-repository.ts';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type ItemRaw = Scalars<Models.public_Item>;
export type ItemMin = ItemRaw;

export type ItemFull = ItemMin & {
	ImageFile: FileMin | null;
	Actions: ActionMin[];
	Notes: NoteMin[];
};

export type IItemRepository = IRepository<ItemRaw, ItemMin, ItemFull>;

export class ItemRepository
	extends Repository<ItemRaw, ItemMin, ItemFull>
	implements IItemRepository
{
	override descriptor = 'Item';

	override async getByIdMin(itemId: UUID): Promise<ItemMin | null> {
		try {
			return await db.orm.public.Item.first({
				ItemId: itemId,
			});
		} catch (e) {
			throw this.getByIdError(itemId, e);
		}
	}

	override async getByIdFull(itemId: UUID): Promise<ItemFull | null> {
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

	override async create(data: ItemRaw): Promise<ItemMin> {
		try {
			await db.orm.public.IActionTarget.create({
				IActionTargetId: data.ItemId,
				Type: 'Item',
			});
			await db.orm.public.INoteEntity.create({
				INoteEntityId: data.ItemId,
				Type: 'Item',
			});
			return await db.orm.public.Item.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		itemId: UUID,
		data: Partial<ItemRaw>,
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
