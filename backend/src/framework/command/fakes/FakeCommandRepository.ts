import { FakeRepository } from '#shared/test/FakeRepository.ts';
import type { CommandRec, CommandRepository } from '../command-repository.ts';
import { fakeCommandRec } from './command-data-fake.ts';

export class FakeCommandRepository
	extends FakeRepository<CommandRec>
	implements CommandRepository
{
	constructor() {
		super({
			record: fakeCommandRec,
		});
	}

	override clone() {
		return new FakeCommandRepository();
	}
}
