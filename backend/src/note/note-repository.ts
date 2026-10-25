import { db } from '#db';
import type { Models } from '#prisma';
import type { INoteEntityModel } from '#prisma-models/INoteEntity.ts';
import type {
	NoteCreateInput,
	NoteModel,
	NoteUpdateInput,
} from '#prisma-models/Note.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export type NoteMin = Omit<Models.public_Note, 'INoteEntity'>;
export type INoteEntityMin = Omit<
	Omit<Omit<Models.public_INoteEntity, 'Item'>, 'LocationItem'>,
	'Region'
>;

export interface INoteEntityIncludeMin extends INoteEntityModel {
	Notes: NoteModel[];
}

export interface INoteRepository
	extends IRepository<NoteMin, NoteCreateInput, NoteUpdateInput> {
	getByEntityId(entityId: UUID): Promise<NoteMin[]>;
}

export class NoteRepository extends Repository<NoteMin, NoteMin, NoteMin> {
	override descriptor = 'Note';

	override async getByIdRaw(noteId: UUID): Promise<NoteMin | null> {
		try {
			return await db.orm.public.Note.first({
				NoteId: noteId,
			});
		} catch (e) {
			throw this.getByIdError(noteId, e);
		}
	}

	override async getById(noteId: UUID): Promise<NoteMin | null> {
		return await this.getByIdRaw(noteId);
	}

	override async getAll(): Promise<NoteMin[]> {
		try {
			return await db.orm.public.Note.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: NoteMin): Promise<NoteMin> {
		try {
			return await db.orm.public.Note.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		noteId: UUID,
		data: Partial<NoteMin>,
	): Promise<NoteMin | null> {
		try {
			return await db.orm.public.Note.where({
				NoteId: noteId,
			}).update(data);
		} catch (e) {
			throw this.updateError(noteId, e);
		}
	}

	/**
	 * Retrieves note records from the database for a given entity ID
	 * @param entityId UUID of the entity to get notes for
	 * @returns The list of notes (empty array if none found)
	 */
	async getByEntityId(entityId: UUID): Promise<NoteMin[]> {
		try {
			const notes = await db.orm.public.Note.where({
				EntityId: entityId,
			}).all();
			return notes;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Entity ID ${entityId}: ${getMessage(e)}`,
			);
		}
	}
}
