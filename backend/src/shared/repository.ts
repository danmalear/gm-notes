import type { PrismaClient } from '#prisma-client';
import type { UUID } from 'crypto';

export interface IRepositoryConfig {
	prisma: PrismaClient;
}

/**
 * Interface for data access repository - defines all baseline operations
 */
export interface IRepository<
	TModel,
	TCreate,
	TUpdate,
	TModelIncludeAll extends TModel = TModel,
> {
	prisma: PrismaClient;

	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	getByIdRaw(id: UUID): Promise<TModel | null>;

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	getById(id: UUID): Promise<TModelIncludeAll | null>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	getAll(): Promise<TModel[]>;

	/**
	 * Inserts a new record into the database
	 * @param data Data to insert into database
	 * @returns The inserted record
	 */
	insert(data: TCreate): Promise<TModel>;

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	update(id: UUID, data: TUpdate): Promise<TModel>;
}
