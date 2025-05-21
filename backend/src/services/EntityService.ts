import type { UUID } from 'crypto';
import type { Entity } from '../entities/Entity';

export interface EntityService<T extends Entity> {
	getById(id: UUID): Promise<T | undefined>;

	insert(data: T): Promise<T>;

	update(id: UUID, data: T): Promise<T>;
}
