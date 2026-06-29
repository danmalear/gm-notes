import type {
	StreamCreateInput,
	StreamModel,
	StreamUpdateInput,
} from '#prisma-models/Stream.ts';
import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker } from '#shared/faker.ts';
import { FakeRepository } from '#shared/fakes/fake-repository.ts';
import type { IStreamRepository } from '../stream-repository.ts';
import { fakeStreamModel } from './fake-stream-data.ts';

export class FakeStreamRepository
	extends FakeRepository<StreamModel, StreamCreateInput, StreamUpdateInput>
	implements Faker<IStreamRepository>, ICloneable<FakeStreamRepository>
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
