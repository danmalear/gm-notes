import { FakeRepository } from '#shared/fakes/FakeRepository.ts';
import type { StreamRec, StreamRepository } from '../stream-repository.ts';
import { fakeStream } from './stream-data-fake.ts';

export class FakeStreamRepository
	extends FakeRepository<StreamRec>
	implements StreamRepository
{
	constructor() {
		super({
			record: fakeStream,
		});
	}

	override clone() {
		return new FakeStreamRepository();
	}
}
