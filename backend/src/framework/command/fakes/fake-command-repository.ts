import type {
	CommandCreateInput,
	CommandModel,
	CommandUpdateInput,
} from '#prisma-models/Command.ts';
import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker } from '#shared/faker.ts';
import { FakeRepository } from '#shared/fakes/fake-repository.ts';
import type { ICommandRepository } from '../command-repository.ts';
import { fakeCommandModel } from './fake-command-data.ts';

export class FakeCommandRepository
	extends FakeRepository<CommandModel, CommandCreateInput, CommandUpdateInput>
	implements Faker<ICommandRepository>, ICloneable<FakeCommandRepository>
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
