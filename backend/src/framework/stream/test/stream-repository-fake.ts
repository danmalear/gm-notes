import { fakeRepository } from '#shared/test/repository-fake.ts';
import type { StreamRec } from '../stream-repository.ts';
import { fakeStream } from './stream-data-fake.ts';

export const getFakeStreamRepository = () => {
	return fakeRepository<StreamRec>({
		record: fakeStream,
	});
};
