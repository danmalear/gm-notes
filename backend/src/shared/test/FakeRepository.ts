import type { Repository } from '../Repository.ts';

export interface FakeRepositoryConfig<TRecord extends object> {
	record: TRecord;
}

export class FakeRepository<TRecord extends object>
	implements Repository<TRecord>
{
	record: TRecord;
	tableName: string;
	pkColumn: keyof TRecord;

	constructor(config: FakeRepositoryConfig<TRecord>) {
		this.tableName = '';
		this.pkColumn = '' as keyof TRecord;
		this.record = config.record;
	}

	clone() {
		return new FakeRepository({ record: this.record });
	}

	async getAll() {
		return [];
	}
	async getById() {
		return this.record;
	}
	async getByIdRaw() {
		return this.record;
	}
	async insert() {
		return this.record;
	}
	async update() {
		return this.record;
	}
}
