import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import type { Stream } from './Stream.ts';

export class StreamRepository extends Repository<Stream> {
	override async getById(id: UUID): Promise<Stream | undefined> {
		return await this.getByIdRaw(id);
	}
}
