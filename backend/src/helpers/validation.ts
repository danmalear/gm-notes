export function validatePostBody(body: unknown): body is object {
	if (!body) {
		throw Error('No request body supplied to POST request');
	}

	if (typeof body !== 'object') {
		throw Error('Request body is of an unsupported format');
	}

	if ('id' in body && body.id) {
		throw Error(
			'POST request received with ID - either remove it if it should be a new record, or use PUT to update existing record',
		);
	}

	return true;
}
