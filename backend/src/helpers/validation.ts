export function validatePostBody(body: unknown): asserts body is object {
	if (!body) {
		throw Error('No request body supplied to POST request');
	}

	if (typeof body !== 'object' || Array.isArray(body)) {
		throw Error('Request body is of an unsupported format');
	}

	if ('id' in body && body.id) {
		throw Error(
			'POST request received with ID - either remove it if it should be a new record, or use PUT to update existing record',
		);
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
