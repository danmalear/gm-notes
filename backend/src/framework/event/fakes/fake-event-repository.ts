import type {
	EventCreateInput,
	EventModel,
	EventUpdateInput,
} from '#prisma-models/Event.ts';
import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import {
	FakeRepository,
	zeroCalls as baseZeroCalls,
} from '#shared/fakes/fake-repository.ts';
import type { IEventRepository } from '../event-repository.ts';
import { fakeEventModel } from './event-data-fake.ts';

const zeroCalls: FakerCalls<IEventRepository> = {
	...baseZeroCalls,
	getByStreamId: 0,
};

export class FakeEventRepository
	extends FakeRepository<EventModel, EventCreateInput, EventUpdateInput>
	implements Faker<IEventRepository>, ICloneable<FakeEventRepository>
{
	override calls: FakerCalls<IEventRepository>;

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
