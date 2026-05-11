import { fakeRepository } from '#shared/test/repository-fake.ts';
import type { EventRec, EventRepository } from '../event-repository.ts';
import { fakeEvent } from './event-data-fake.ts';

export const getFakeEventRepository = () => {
	const fakeBaseRepository = fakeRepository<EventRec>({
		record: fakeEvent,
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
