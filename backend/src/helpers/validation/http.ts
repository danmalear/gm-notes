import type { UUID } from 'crypto';
import { isUUID } from '../uuid.ts';

function validateBody(
	body: unknown,
	requestType: 'PUT' | 'POST',
): asserts body is object {
	if (!body) {
		throw Error(`No request body supplied to ${requestType} request`);
	}

	if (typeof body !== 'object' || Array.isArray(body)) {
		throw Error('Request body is of an unsupported format');
	}
}

export function validatePostBody(body: unknown): asserts body is object {
	validateBody(body, 'POST');

	if ('id' in body && body.id) {
		throw Error(
			'POST request received with ID - either remove it if it should be a new record, or use PUT to update existing record',
		);
	}
}

export function validatePutBody(body: unknown): asserts body is { id: UUID } {
	validateBody(body, 'PUT');

	if (!('id' in body) || !body.id) {
		throw Error(
			'PUT request received without ID - either add it if it should exist, or use POST to create a new record',
		);
	}

	if (!body.id || typeof body.id !== 'string' || !isUUID(body.id)) {
		throw Error('Object with invalid ID supplied to PUT request');
	}
}

export function requiredFields<T extends object, K extends readonly string[]>(
	body: T,
	fields: K,
	errorOverride?: string,
): asserts body is T & { [P in K[number]]: unknown } {
	const error = (field: string) =>
		errorOverride ?? `Request body missing required field: ${field}`;

	for (const field of fields) {
		if (!(field in body) || !(body as { [field]: unknown })[field]) {
			throw Error(error(field));
		}
	}
}
