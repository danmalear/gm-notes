import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface NoteRec {
	NoteId: UUID;
	EntityId: UUID;
	Description: string;
}

export const tableName = 'Note';
export const pkColumn = 'NoteId';

export class NoteRepository extends Repository<NoteRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override clone() {
		return new NoteRepository();
	}

	override async getById(id: UUID): Promise<NoteRec | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves note records from the database for a given entity ID
	 * @param entityId UUID of the entity to get notes for
	 * @returns The list of notes (empty array if none found)
	 */
	async getByEntityId(entityId: UUID) {
		try {
			const notes = await db<NoteRec>(this.tableName).where(
				'EntityId',
				entityId,
			);
			return notes;
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for entity ID ${entityId}: ${getMessage(e)}`,
			);
		}
	}
}
