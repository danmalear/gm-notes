import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import type { UUID } from 'crypto';

export abstract class Repository<
	TRecord,
	TRefRecord extends TRecord = TRecord,
> {
	tableName: string;
	pkColumn: string;

	constructor(tableName: string, pkColumn: string) {
		this.tableName = tableName;
		this.pkColumn = pkColumn;
	}

	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or undefined if not found
	 */
	async getByIdRaw(id: UUID) {
		try {
			return (await db(this.tableName)
				.where(this.pkColumn as string, id)
				.first()) as TRecord | undefined;
		} catch (e) {
			throw Error(`Error getting ${this.tableName} by ID: ${getMessage(e)}`);
		}
	}

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or undefined if not found
	 */
	abstract getById(id: UUID): Promise<TRefRecord | undefined>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	async getAll() {
		try {
			return (await db(this.tableName)) as TRecord[];
		} catch (e) {
			throw Error(
				`Error getting all ${this.tableName} records: ${getMessage(e)}`,
			);
		}
	}

	/**
	 * Inserts a new record into the database
	 * @param data Data to insert into database
	 * @returns The inserted record
	 */
	async insert(data: TRecord) {
		try {
			return (await db(this.tableName)
				.insert(data)
				.returning('*')
				.then((returning) => returning[0])) as TRecord;
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
	async update(id: UUID, data: Partial<TRecord>) {
		try {
			return (await db(this.tableName)
				.where(this.pkColumn as string, id)
				.update(data)
				.returning('*')
				.then((returning) => returning[0])) as TRecord;
		} catch (e) {
			throw Error(
				`Error updating ${this.tableName} with ID ${id}: ${getMessage(e)}`,
			);
		}
	}
}
