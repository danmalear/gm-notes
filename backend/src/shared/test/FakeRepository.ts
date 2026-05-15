import { Repository } from '../Repository.ts';

export interface FakeRepositoryConfig<TRecord extends object> {
	record: TRecord;
}

export class FakeRepository<
	TRecord extends object,
> extends Repository<TRecord> {
	record: TRecord;

	constructor(config: FakeRepositoryConfig<TRecord>) {
		super('', '' as keyof TRecord);
		this.record = config.record;
	}

	clone() {
		return new FakeRepository({ record: this.record });
	}

	override async getAll() {
		return [];
	}
	override async getById() {
		return this.record;
	}
	override async getByIdRaw() {
		return this.record;
	}
	override async insert() {
		return this.record;
	}
	override async update() {
		return this.record;
	}
}
