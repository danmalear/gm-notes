import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import type { StreamRaw } from './StreamRaw.ts';

export class StreamRepository extends Repository<StreamRaw> {
	override async getById(id: UUID): Promise<StreamRaw | undefined> {
		return await this.getByIdRaw(id);
	}
}
