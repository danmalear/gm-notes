import type { EventRec, EventRepository } from '#event/event-repository.ts';
import { fakeRepository } from '#shared/test/repository-fake.ts';

interface FakeEventRepositoryConfig {
	record: EventRec;
}

export const fakeEventRepository = (config: FakeEventRepositoryConfig) => {
	const fakeBaseRepository = fakeRepository<EventRec>({
		record: config.record,
	});

	const fakeEventRepository: EventRepository = {
		...fakeBaseRepository,
		getAll: fakeBaseRepository.getAll,
		getByIdRaw: fakeBaseRepository.getByIdRaw,
		getById: fakeBaseRepository.getById,
		insert: fakeBaseRepository.insert,
		update: fakeBaseRepository.update,
		getByStreamId: () => Promise.resolve([]),
	};

	return fakeEventRepository;
};
