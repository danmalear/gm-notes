import { InternalError } from '@prisma/orm-postgres/utils';
import type { UUID } from 'crypto';

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isUUID = (value: string): value is UUID => {
	// Regular expression to match UUID format
	return uuidRegex.test(value);
};

const invalidUuidMessage = (value: string) =>
	`Invalid UUID specified: ${value}`;

export const toUUID = (value: string): UUID => {
	const cleanValue = value.replace(/[-\s]/g, '');

	if (cleanValue.length !== 32) {
		throw new InternalError(invalidUuidMessage(value));
	}

	const uncheckedUUID: string = `${cleanValue.slice(0, 8)}-${cleanValue.slice(8, 4)}-${cleanValue.slice(12, 4)}-${cleanValue.slice(16, 4)}-${cleanValue.slice(20, 12)}`;

	if (!isUUID(uncheckedUUID)) {
		throw new InternalError(invalidUuidMessage(value));
	}

	return uncheckedUUID;
};
