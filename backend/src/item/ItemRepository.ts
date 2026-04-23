import type { ActionRepository } from '#action/ActionRepository.ts';
import type { FileRepository } from '#file/FileRepository.ts';
import type { NoteRepository } from '#note/NoteRepository.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type Item, type ItemRaw } from './Item.ts';

export class ItemRepository extends Repository<ItemRaw, Item> {
	actionRepository: ActionRepository;
	fileRepository: FileRepository;
	noteRepository: NoteRepository;

	constructor(
		actionRepository: ActionRepository,
		fileRepository: FileRepository,
		noteRepository: NoteRepository,
	) {
		super(tableName, pkColumn);
		this.actionRepository = actionRepository;
		this.fileRepository = fileRepository;
		this.noteRepository = noteRepository;
	}

	override async getById(id: UUID): Promise<Item | undefined> {
		const itemRaw = await this.getByIdRaw(id);
		if (!itemRaw) return undefined;

		const actions = await this.actionRepository.getByTargetId(itemRaw.ItemId);
		const imageFile = itemRaw.ImageFileId
			? ((await this.fileRepository.getById(itemRaw.ImageFileId)) ?? null)
			: null;
		const notes = await this.noteRepository.getByEntityId(itemRaw.ItemId);

		return {
			...itemRaw,
			Actions: actions,
			ImageFile: imageFile,
			Notes: notes,
		};
	}
}
