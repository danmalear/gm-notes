import type {
	StreamCreateInput,
	StreamModel,
	StreamUpdateInput,
} from '#prisma-models/Stream.ts';
import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker } from '#shared/Faker.ts';
import { FakeRepository } from '#shared/fakes/fake-repository.ts';
import type { StreamRepository } from '../stream-repository.ts';
import { fakeStreamModel } from './stream-data-fake.ts';

export class FakeStreamRepository
	extends FakeRepository<StreamModel, StreamCreateInput, StreamUpdateInput>
	implements Faker<StreamRepository>, ICloneable<FakeStreamRepository>
{
	constructor() {
		super({
			model: fakeStreamModel,
		});
	}

	override clone() {
		return new FakeStreamRepository();
	}
}
