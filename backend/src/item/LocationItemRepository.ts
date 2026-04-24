import type { ActionRepository } from '#action/ActionRepository.ts';
import type { NoteRepository } from '#note/NoteRepository.ts';
import { db } from '#shared/db.ts';
import { getMessage, InternalError } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import {
	pkColumn as itemPkColumn,
	tableName as itemTableName,
	type ItemRaw,
} from './Item.ts';
import type { ItemRepository } from './ItemRepository.ts';
import {
	itemIdColName,
	locationIdColName,
	pkColumn,
	tableName,
	type LocationItem,
	type LocationItemRaw,
} from './LocationItem.ts';

export class LocationItemRepository extends Repository<
	LocationItemRaw,
	LocationItem
> {
	actionRepository: ActionRepository;
	itemRepository: ItemRepository;
	noteRepository: NoteRepository;

	constructor(
		actionRepository: ActionRepository,
		itemRepository: ItemRepository,
		noteRepository: NoteRepository,
	) {
		super(tableName, pkColumn);
		this.actionRepository = actionRepository;
		this.itemRepository = itemRepository;
		this.noteRepository = noteRepository;
	}

	override async getById(id: UUID): Promise<LocationItem | undefined> {
		const locationItemRaw = await this.getByIdRaw(id);
		if (!locationItemRaw) return undefined;

		const item = await this.itemRepository.getById(locationItemRaw.ItemId);
		if (!item) throw new InternalError('Item instance has no item reference');

		const locationItemActions = await this.actionRepository.getByTargetId(
			locationItemRaw.LocationItemId,
		);

		const actions = [...locationItemActions, ...item.Actions];

		const locationItemNotes = await this.noteRepository.getByEntityId(
			locationItemRaw.LocationItemId,
		);

		const notes = [...locationItemNotes, ...item.Notes];

		const containedItems = item.IsContainer
			? await this.getByLocationId(id)
			: [];

		return {
			...item,
			...locationItemRaw,
			Actions: actions,
			Notes: notes,
			ContainedItems: containedItems,
		};
	}

	/**
	 * Retrieves item records from the database for a given location ID
	 * @param id UUID of the location to get items for
	 * @returns The list of items (empty array if none found)
	 */
	async getByLocationId(locationId: UUID) {
		try {
			return await db<LocationItemRaw>(this.tableName)
				.innerJoin<ItemRaw>(
					itemTableName,
					`${this.tableName}.${itemIdColName}`,
					`${itemTableName}.${itemPkColumn}`,
				)
				.where(`${this.tableName}.${locationIdColName}`, locationId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for location ID ${locationId}: ${getMessage(e)}`,
			);
		}
	}
}
