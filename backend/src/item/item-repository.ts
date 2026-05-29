import type { ActionRec, ActionRepository } from '#action/action-repository.ts';
import type { FileRec, FileRepository } from '#file/file-repository.ts';
import type { NoteRec, NoteRepository } from '#note/note-repository.ts';
import type { CurrencyUnit } from '#shared/data-types.ts';
import { Repository } from '#shared/repository-old.ts';
import type { UUID } from 'crypto';

export interface ItemRec {
	ItemId: UUID;
	CampaignId: UUID | null;
	Name: string;
	IsContainer: boolean;
	Value: number | null;
	ValueUnit: CurrencyUnit | null;
	DetailsLink: string | null;
	ImageFileId: string | null;
}

export interface ItemRefRec extends ItemRec {
	ImageFile: FileRec | null;
	Actions: ActionRec[];
	Notes: NoteRec[];
}

export const tableName = 'Item';
export const pkColumn = 'ItemId';

export interface ItemRepositoryConfig {
	actionRepository: ActionRepository;
	fileRepository: FileRepository;
	noteRepository: NoteRepository;
}

export class ItemRepository extends Repository<ItemRec, ItemRefRec> {
	actionRepository: ActionRepository;
	fileRepository: FileRepository;
	noteRepository: NoteRepository;

	constructor({
		actionRepository,
		fileRepository,
		noteRepository,
	}: ItemRepositoryConfig) {
		super(tableName, pkColumn);
		this.actionRepository = actionRepository;
		this.fileRepository = fileRepository;
		this.noteRepository = noteRepository;
	}

	override async getById(id: UUID): Promise<ItemRefRec | undefined> {
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
