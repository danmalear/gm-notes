import type { Faker } from '#shared/Faker.ts';
import { FakeRepository } from '#shared/fakes/FakeRepository.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { CommandRec, CommandRepository } from '../command-repository.ts';
import { fakeCommandRec } from './command-data-fake.ts';

export class FakeCommandRepository
	extends FakeRepository<CommandRec>
	implements Faker<CommandRepository>, ICloneable<FakeCommandRepository>
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
