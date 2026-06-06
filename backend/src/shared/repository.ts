import type { PrismaClient } from '#prisma-client';
import type { UUID } from 'crypto';
import { getMessage } from './error.ts';

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

interface Delegate<TModel, TFindUniqueWhere, TFindManyWhere, TCreateInput> {
	findUnique: (args: { where: TFindUniqueWhere }) => Promise<TModel | null>;
	findMany: (args?: { where: TFindManyWhere }) => Promise<TModel[]>;
	create: (args: { data: TCreateInput }) => Promise<TModel>;
}

export interface GetManyOpts<
	TModel,
	TWhere extends object,
	TDelegate extends Delegate<TModel, never, TWhere, never>,
> {
	delegate: TDelegate;
	where?: TWhere;
}

export interface GetOneOpts<
	TModel,
	TWhere extends object,
	TDelegate extends Delegate<TModel, TWhere, never, never>,
> {
	delegate: TDelegate;
	where: TWhere;
}

export interface InsertOpts<
	TModel,
	TInput extends object,
	TDelegate extends Delegate<TModel, never, never, TInput>,
> {
	delegate: TDelegate;
	data: TInput;
}

/**
 * Abstract for data access repository - defines all baseline operations and provides basic functionality
 */
export abstract class Repository<
	TModel,
	TCreate extends object,
	TUpdate extends object,
	TModelIncludeAll extends TModel = TModel,
> implements IRepository<TModel, TCreate, TUpdate, TModelIncludeAll>
{
	prisma: PrismaClient;
	abstract descriptor: string;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	async $getOne<
		TWhere extends object,
		TDelegate extends Delegate<TModel, TWhere, never, never>,
	>({ delegate, where }: GetOneOpts<TModel, TWhere, TDelegate>) {
		try {
			return await delegate.findUnique({
				where,
			});
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} by ID: ${getMessage(e)}`,
			);
		}
	}

	async $getMany<
		TWhere extends object,
		TDelegate extends Delegate<TModel, never, TWhere, never>,
	>({ delegate, where }: GetManyOpts<TModel, TWhere, TDelegate>) {
		try {
			return where
				? await delegate.findMany({
						where,
					})
				: await delegate.findMany();
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records: ${getMessage(e)}`,
			);
		}
	}

	async $insert<TDelegate extends Delegate<TModel, never, never, TCreate>>({
		delegate,
		data,
	}: InsertOpts<TModel, TCreate, TDelegate>) {
		try {
			return await delegate.create({
				data,
			});
		} catch (e) {
			throw new Error(
				`Error creating new ${this.descriptor}: ${getMessage(e)}`,
			);
		}
	}

	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	abstract getByIdRaw(id: UUID): Promise<TModel | null>;

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	abstract getById(id: UUID): Promise<TModelIncludeAll | null>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	abstract getAll(): Promise<TModel[]>;

	/**
	 * Inserts a new record into the database
	 * @param data Data to insert into database
	 * @returns The inserted record
	 */
	abstract insert(data: TCreate): Promise<TModel>;

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	abstract update(id: UUID, data: TUpdate): Promise<TModel>;
}
