import { type UUID } from 'crypto';
import { db } from './db.ts';
import { getMessage } from './helpers/error.ts';

export class Repository<T> {
	tableName: string;
	pkColumn: keyof T;

	constructor(tableName: string, pkColumn: keyof T) {
		this.tableName = tableName;
		this.pkColumn = pkColumn;
	}

	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or undefined if not found
	 */
	async getById(id: UUID): Promise<T | undefined> {
		try {
			const record = (await db(this.tableName)
				.where(this.pkColumn as string, id)
				.first()) as T | undefined;

			return record;
		} catch (e) {
			throw Error(`Error getting ${this.tableName} by ID: ${getMessage(e)}`);
		}
	}

	/**
	 * Inserts a new record into the database
	 * @param data Data to insert into database
	 * @returns The inserted record
	 */
	async insert(data: T) {
		try {
			const record = await db(this.tableName)
				.insert(data)
				.returning('*')
				.then((returning) => returning[0]);

			return record;
		} catch (e) {
			throw Error(`Error inserting ${this.tableName}: ${getMessage(e)}`);
		}
	}

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	async update(id: string, data: T) {
		try {
			const record = await db(this.tableName)
				.where(this.pkColumn as string, id)
				.update(data)
				.returning('*')
				.then((returning) => returning[0]);

			return record as T;
		} catch (e) {
			throw Error(
				`Error updating ${this.tableName} with ID ${id}: ${getMessage(e)}`,
			);
		}
	}
}
