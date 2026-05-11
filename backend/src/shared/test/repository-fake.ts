import type { Repository } from '../Repository.ts';

export interface FakeRepositoryConfig<TRecord extends object> {
	record: TRecord;
}

export const fakeRepository = <TRecord extends object>(
	config: FakeRepositoryConfig<TRecord>,
) => {
	const { record } = config;

	const repository: Repository<TRecord> = {
		tableName: '',
		pkColumn: '' as keyof TRecord,
		getAll: () => Promise.resolve([]),
		getById: () => Promise.resolve(record),
		getByIdRaw: () => Promise.resolve(record),
		insert: () => Promise.resolve(record),
		update: () => Promise.resolve(record),
	};

	return repository;
};
