import type { Faker, FakerCalls } from '#shared/Faker.ts';
import {
	FakeRepository,
	zeroCalls as baseZeroCalls,
} from '#shared/fakes/FakeRepository.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { EventRec, EventRepository } from '../event-repository.ts';
import { fakeEventRec } from './event-data-fake.ts';

const zeroCalls: FakerCalls<EventRepository> = {
	...baseZeroCalls,
	getByStreamId: 0,
};

export class FakeEventRepository
	extends FakeRepository<EventRec>
	implements Faker<EventRepository>, ICloneable<FakeEventRepository>
{
	calls: FakerCalls<EventRepository>;

	constructor() {
		super({
			record: fakeEventRec,
		});
		this.calls = { ...zeroCalls };
	}

	resetCalls(): void {
		this.calls = { ...zeroCalls };
	}

	clone() {
		return new FakeEventRepository();
	}

	async getByStreamId() {
		this.calls.getByStreamId++;
		return [];
	}
}
