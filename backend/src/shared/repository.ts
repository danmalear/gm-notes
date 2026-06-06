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

export interface Delegate<
	TModel,
	TFindUniqueWhere,
	TFindManyWhere,
	TCreateInput,
	TUpdateInput,
> {
	findUnique: (args: { where: TFindUniqueWhere }) => Promise<TModel | null>;
	findMany: (args?: { where: TFindManyWhere }) => Promise<TModel[]>;
	create: (args: { data: TCreateInput }) => Promise<TModel>;
	update: (args: {
		where: TFindUniqueWhere;
		data: TUpdateInput;
	}) => Promise<TModel>;
}

export interface GetManyOpts<TWhere extends object> {
	where?: TWhere;
}

export interface GetOneOpts<TWhere extends object> {
	where: TWhere;
}

export interface InsertOpts<TInput extends object> {
	data: TInput;
}

export interface UpdateOpts<TWhere extends object, TInput extends object> {
	where: TWhere;
	data: TInput;
}

/**
 * Abstract for data access repository - defines all baseline operations and provides basic functionality
 */
export abstract class Repository<
	TModel,
	TCreate extends object,
	TUpdate extends object,
	TFindUniqueWhere extends object,
	TFindManyWhere extends object,
	TDelegate extends Delegate<
		TModel,
		TFindUniqueWhere,
		TFindManyWhere,
		TCreate,
		TUpdate
	>,
	TModelIncludeAll extends TModel = TModel,
> implements IRepository<TModel, TCreate, TUpdate, TModelIncludeAll>
{
	prisma: PrismaClient;
	abstract descriptor: string;
	abstract delegate: TDelegate;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	async $getOne({ where }: GetOneOpts<TFindUniqueWhere>) {
		try {
			return await this.delegate.findUnique({
				where,
			});
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} by ID: ${getMessage(e)}`,
			);
		}
	}

	async $getMany(args?: GetManyOpts<TFindManyWhere>) {
		try {
			return args?.where
				? await this.delegate.findMany({
						where: args.where,
					})
				: await this.delegate.findMany();
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records: ${getMessage(e)}`,
			);
		}
	}

	async $insert({ data }: InsertOpts<TCreate>) {
		try {
			return await this.delegate.create({
				data,
			});
		} catch (e) {
			throw new Error(
				`Error creating new ${this.descriptor}: ${getMessage(e)}`,
			);
		}
	}

	async $update({ where, data }: UpdateOpts<TFindUniqueWhere, TUpdate>) {
		try {
			return await this.delegate.update({
				where,
				data,
			});
		} catch (e) {
			throw new Error(`Error updating ${this.descriptor}: ${getMessage(e)}`);
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
