import { getMessage } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { getMap } from './map-service.ts';

export async function mapLoader({ params }: LoaderFunctionArgs) {
	try {
		if (!params.mapId || !isUUID(params.mapId)) {
			throw Error('Map ID malformed');
		}
		const response = await getMap(params.mapId);

		if (!response?.data?.data) {
			// @TODO probably make this a 404 page
			throw Error('Map not found');
		}

		return {
			map: response.data.data,
		};
	} catch (e) {
		console.error(getMessage(e));
		return redirect('/campaign');
	}
}
