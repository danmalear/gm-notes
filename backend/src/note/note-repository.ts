import type {
	NoteCreateInput,
	NoteModel,
	NoteUpdateInput,
} from '#prisma-models/Note.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface INoteRepository
	extends IRepository<NoteModel, NoteCreateInput, NoteUpdateInput> {
	getByEntityId(entityId: UUID): Promise<NoteModel[]>;
}

export class NoteRepository extends Repository<
	NoteModel,
	NoteCreateInput,
	NoteUpdateInput
> {
	override descriptor = 'Note';

	override async getByIdRaw(noteId: UUID): Promise<NoteModel | null> {
		try {
			return await this.prisma.note.findUnique({
				where: {
					NoteId: noteId,
				},
			});
		} catch (e) {
			throw this.getByIdError(noteId, e);
		}
	}

	override async getById(noteId: UUID): Promise<NoteModel | null> {
		return await this.getByIdRaw(noteId);
	}

	override async getAll(): Promise<NoteModel[]> {
		try {
			return await this.prisma.note.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: NoteCreateInput): Promise<NoteModel> {
		try {
			return await this.prisma.note.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		noteId: UUID,
		data: NoteUpdateInput,
	): Promise<NoteModel> {
		try {
			return await this.prisma.note.update({
				where: {
					NoteId: noteId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(noteId, e);
		}
	}

	/**
	 * Retrieves note records from the database for a given entity ID
	 * @param entityId UUID of the entity to get notes for
	 * @returns The list of notes (empty array if none found)
	 */
	async getByEntityId(entityId: UUID): Promise<NoteModel[]> {
		try {
			const notes = await this.prisma.note.findMany({
				where: {
					EntityId: entityId,
				},
			});
			return notes;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Entity ID ${entityId}: ${getMessage(e)}`,
			);
		}
	}
}
