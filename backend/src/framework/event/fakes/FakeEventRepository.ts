import type { Faker, FakerCalls } from '#shared/Faker.ts';
import { FakeRepository, zeroCalls } from '#shared/fakes/FakeRepository.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { EventRec, EventRepository } from '../event-repository.ts';
import { fakeEventRec } from './event-data-fake.ts';

export class FakeEventRepository
	extends FakeRepository<EventRec>
	implements Faker<EventRepository>, ICloneable<FakeEventRepository>
{
	calls: FakerCalls<EventRepository>;

	constructor() {
		super({
			record: fakeEventRec,
		});
		this.calls = {
			...zeroCalls,
			getByStreamId: 0,
		};
	}

	resetCalls(): void {
		super.resetCalls();
	}

	clone() {
		return new FakeEventRepository();
	}

	async getByStreamId() {
		this.calls.getByStreamId++;
		return [];
	}
}
