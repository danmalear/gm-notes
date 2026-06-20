import type { ActionModel } from '#prisma-models/Action.ts';
import type { FileModel } from '#prisma-models/File.ts';
import type {
	ItemCreateInput,
	ItemInclude,
	ItemModel,
	ItemUpdateInput,
} from '#prisma-models/Item.ts';
import type { NoteModel } from '#prisma-models/Note.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface ItemIncludeAll extends ItemModel {
	ImageFile: FileModel | null;
	Actions: ActionModel[];
	Notes: NoteModel[];
}

export type IItemRepository = IRepository<
	ItemModel,
	ItemCreateInput,
	ItemUpdateInput,
	ItemIncludeAll
>;

export class ItemRepository
	extends Repository<
		ItemModel,
		ItemCreateInput,
		ItemUpdateInput,
		ItemIncludeAll
	>
	implements IItemRepository
{
	override descriptor = 'Item';

	override async getByIdRaw(itemId: UUID): Promise<ItemModel | null> {
		try {
			return await this.prisma.item.findUnique({
				where: {
					ItemId: itemId,
				},
			});
		} catch (e) {
			throw this.getByIdError(itemId, e);
		}
	}

	override async getById(itemId: UUID): Promise<ItemIncludeAll | null> {
		const include = {
			Actions: true,
			ImageFile: true,
			Notes: true,
		} satisfies ItemInclude;

		try {
			return await this.prisma.item.findUnique({
				where: {
					ItemId: itemId,
				},
				include,
			});
		} catch (e) {
			throw this.getByIdError(itemId, e);
		}
	}

	override async getAll(): Promise<ItemModel[]> {
		try {
			return await this.prisma.item.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ItemCreateInput): Promise<ItemModel> {
		try {
			return await this.prisma.item.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		itemId: UUID,
		data: ItemUpdateInput,
	): Promise<ItemModel> {
		try {
			return await this.prisma.item.update({
				where: {
					ItemId: itemId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(itemId, e);
		}
	}
}
