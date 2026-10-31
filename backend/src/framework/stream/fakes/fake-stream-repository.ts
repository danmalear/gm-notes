import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker } from '#shared/faker.ts';
import { FakeRepository } from '#shared/fakes/fake-repository.ts';
import type { IStreamRepository, StreamMin } from '../stream-repository.ts';
import { fakeStreamModel } from './fake-stream-data.ts';

export class FakeStreamRepository
	extends FakeRepository<StreamMin, StreamMin, StreamMin>
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
