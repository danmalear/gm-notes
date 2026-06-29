import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import type { IRepository } from '../repository.ts';

export interface FakeRepositoryConfig<TModel extends object> {
	model: TModel;
}

export const zeroCalls: FakerCalls<IRepository<object, object, object>> = {
	getAll: 0,
	getByIdRaw: 0,
	getById: 0,
	create: 0,
	update: 0,
};

export abstract class FakeRepository<TModel extends object, TCreate, TUpdate>
	implements
		Faker<IRepository<TModel, TCreate, TUpdate>>,
		ICloneable<FakeRepository<TModel, TCreate, TUpdate>>
{
	model: TModel;
	calls: FakerCalls<IRepository<object, object, object>>;

	constructor(config: FakeRepositoryConfig<TModel>) {
		this.model = config.model;
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	abstract clone(): FakeRepository<TModel, TCreate, TUpdate>;

	async getAll() {
		this.calls.getAll++;
		return [];
	}

	async getById() {
		this.calls.getById++;
		return this.model;
	}

	async getByIdRaw() {
		this.calls.getByIdRaw++;
		return this.model;
	}

	async create() {
		this.calls.create++;
		return this.model;
	}

	async update() {
		this.calls.update++;
		return this.model;
	}
}
