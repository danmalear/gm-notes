import { fakeRepository } from '#shared/test/repository-fake.ts';
import type { CommandRec } from '../command-repository.ts';
import { fakeCommand } from './command-data-fake.ts';

export const getFakeCommandRepository = () => {
	return fakeRepository<CommandRec>({
		record: fakeCommand,
	});
};
