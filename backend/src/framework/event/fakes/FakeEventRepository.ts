import { FakeRepository } from '#shared/fakes/FakeRepository.ts';
import type { EventRec, EventRepository } from '../event-repository.ts';
import { fakeEventRec } from './event-data-fake.ts';

export class FakeEventRepository
	extends FakeRepository<EventRec>
	implements EventRepository
{
	constructor() {
		super({
			record: fakeEventRec,
		});
	}

	override clone() {
		return new FakeEventRepository();
	}

	async getByStreamId() {
		return [];
	}
}
