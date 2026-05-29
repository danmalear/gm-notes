import type { ActionRepository } from '#action/action-repository.ts';
import type { NoteRepository } from '#note/note-repository.ts';
import { db } from '#shared/db.ts';
import { getMessage, InternalError } from '#shared/error.ts';
import { Repository } from '#shared/repository-old.ts';
import type { UUID } from 'crypto';
import {
	pkColumn as itemPkColumn,
	tableName as itemTableName,
	type ItemRec,
	type ItemRefRec,
	type ItemRepository,
} from './item-repository.ts';

export interface LocationItemRec {
	LocationItemId: UUID;
	LocationId: UUID;
	ItemId: UUID;
	Quantity: number;
}

export interface LocationItemRefRec extends ItemRefRec, LocationItemRec {
	ContainedItems: (ItemRec & LocationItemRec)[];
}

export const tableName = 'LocationItem';
export const pkColumn = 'LocationItemId';
export const locationIdColName = 'LocationId';
export const itemIdColName = 'ItemId';

export interface LocationItemRepositoryConfig {
	actionRepository: ActionRepository;
	itemRepository: ItemRepository;
	noteRepository: NoteRepository;
}

export class LocationItemRepository extends Repository<
	LocationItemRec,
	LocationItemRefRec
> {
	actionRepository: ActionRepository;
	itemRepository: ItemRepository;
	noteRepository: NoteRepository;

	constructor({
		actionRepository,
		itemRepository,
		noteRepository,
	}: LocationItemRepositoryConfig) {
		super(tableName, pkColumn);
		this.actionRepository = actionRepository;
		this.itemRepository = itemRepository;
		this.noteRepository = noteRepository;
	}

	override async getById(id: UUID): Promise<LocationItemRefRec | undefined> {
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
			return await db<LocationItemRec>(this.tableName)
				.innerJoin<ItemRec>(
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
