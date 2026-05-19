import type { Faker, FakerCalls } from '#shared/Faker.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { Repository } from '../Repository.ts';

export interface FakeRepositoryConfig<TRecord extends object> {
	record: TRecord;
}

export const zeroCalls: FakerCalls<Repository<object>> = {
	getAll: 0,
	getByIdRaw: 0,
	getById: 0,
	insert: 0,
	update: 0,
};

export abstract class FakeRepository<TRecord extends object>
	implements Faker<Repository<TRecord>>, ICloneable<FakeRepository<TRecord>>
{
	record: TRecord;
	tableName: string;
	pkColumn: string;
	calls: FakerCalls<Repository<object>>;

	constructor(config: FakeRepositoryConfig<TRecord>) {
		this.tableName = '';
		this.pkColumn = '';
		this.record = config.record;
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	abstract clone(): FakeRepository<TRecord>;

	async getAll() {
		this.calls.getAll++;
		return [];
	}
	async getById() {
		this.calls.getById++;
		return this.record;
	}
	async getByIdRaw() {
		this.calls.getByIdRaw++;
		return this.record;
	}
	async insert() {
		this.calls.insert++;
		return this.record;
	}
	async update() {
		this.calls.update++;
		return this.record;
	}
}
