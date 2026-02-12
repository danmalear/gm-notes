import type { UUID } from 'crypto';

export interface RegionTemplateStub {
	id: UUID;
	mapTemplateId?: UUID;
	name: string;
}
