import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type Note } from './Note.ts';

export class NoteRepository extends Repository<Note, Note> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<Note | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves note records from the database for a given entity ID
	 * @param entityId UUID of the entity to get notes for
	 * @returns The list of notes (empty array if none found)
	 */
	async getByEntityId(entityId: UUID) {
		try {
			const notes = await db<Note>(this.tableName).where('EntityId', entityId);
			return notes;
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for entity ID ${entityId}: ${getMessage(e)}`,
			);
		}
	}
}
