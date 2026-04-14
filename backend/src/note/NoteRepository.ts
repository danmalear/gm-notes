import type { UUID } from 'crypto';
import { db } from '../db.ts';
import { getMessage } from '../helpers/error.ts';
import { Repository } from '../repositories/Repository.ts';
import { pkColumn, tableName, type Note } from './Note.ts';

export class NoteRepository extends Repository<Note> {
	constructor() {
		super(tableName, pkColumn);
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
