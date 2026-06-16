import type { HandoutType } from '#prisma-enums';
import type { UUID } from 'crypto';

/**
 * Minimal response structure for handouts.
 * Useful for showing basic information in a list or as part of a parent object.
 */
export interface HandoutStub {
	id: UUID;
	campaignId: UUID;
	name: string;
	type: HandoutType;
	source: string;
}
