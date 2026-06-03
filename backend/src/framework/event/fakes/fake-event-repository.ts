import type {
	EventCreateInput,
	EventModel,
	EventUpdateInput,
} from '#prisma-models/Event.ts';
import type { Faker, FakerCalls } from '#shared/Faker.ts';
import {
	FakeRepository,
	zeroCalls as baseZeroCalls,
} from '#shared/fakes/fake-repository.ts';
import type { ICloneable } from '#shared/ICloneable.ts';
import type { EventRepository } from '../event-repository.ts';
import { fakeEventModel } from './event-data-fake.ts';

const zeroCalls: FakerCalls<EventRepository> = {
	...baseZeroCalls,
	getByStreamId: 0,
};

export class FakeEventRepository
	extends FakeRepository<EventModel, EventCreateInput, EventUpdateInput>
	implements Faker<EventRepository>, ICloneable<FakeEventRepository>
{
	override calls: FakerCalls<EventRepository>;

	constructor() {
		super({
			model: fakeEventModel,
		});
		this.calls = { ...zeroCalls };
	}

	override resetCalls(): void {
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
