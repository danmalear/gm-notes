import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import type { IRepository } from '../repository.ts';

export interface FakeRepositoryConfig<TModel extends object> {
	model: TModel;
}

export const zeroCalls: FakerCalls<IRepository<object, object, object>> = {
	getAll: 0,
	getByIdMin: 0,
	getByIdFull: 0,
	create: 0,
	update: 0,
};

export abstract class FakeRepository<
	TRaw extends object,
	TMin extends TRaw,
	TFull extends TMin,
>
	implements
		Faker<IRepository<TRaw, TMin, TFull>>,
		ICloneable<FakeRepository<TRaw, TMin, TFull>>
{
	model: TFull;
	calls: FakerCalls<IRepository<object, object, object>>;

	constructor(config: FakeRepositoryConfig<TFull>) {
		this.model = config.model;
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	abstract clone(): FakeRepository<TRaw, TMin, TFull>;

	async getAll() {
		this.calls.getAll++;
		return [];
	}

	async getByIdFull() {
		this.calls.getByIdFull++;
		return this.model;
	}

	async getByIdMin() {
		this.calls.getByIdMin++;
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
