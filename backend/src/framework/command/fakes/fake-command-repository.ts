import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker } from '#shared/faker.ts';
import { FakeRepository } from '#shared/fakes/fake-repository.ts';
import type { CommandMin, ICommandRepository } from '../command-repository.ts';
import { fakeCommandModel } from './fake-command-data.ts';

export class FakeCommandRepository
	extends FakeRepository<CommandMin, CommandMin, CommandMin>
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
