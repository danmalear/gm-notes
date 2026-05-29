import type {
	CommandCreateInput,
	CommandModel,
	CommandUpdateInput,
} from '#prisma-models/Command.ts';
import type { Faker } from '#shared/Faker.ts';
import { FakeRepository } from '#shared/fakes/fake-repository.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { CommandRepository } from '../command-repository.ts';
import { fakeCommandModel } from './command-data-fake.ts';

export class FakeCommandRepository
	extends FakeRepository<CommandModel, CommandCreateInput, CommandUpdateInput>
	implements Faker<CommandRepository>, ICloneable<FakeCommandRepository>
{
	constructor() {
		super({
			model: fakeCommandModel,
		});
	}

	override clone() {
		return new FakeCommandRepository();
	}
}
