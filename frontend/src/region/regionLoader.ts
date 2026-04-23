import { redirect, type LoaderFunctionArgs } from 'react-router';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { getRegion } from './regionService.ts';

export async function regionLoader({ params }: LoaderFunctionArgs) {
	try {
		if (!params.campaignId || !isUUID(params.campaignId)) {
			throw Error('Campaign ID malformed');
		}

		if (!params.mapId || !isUUID(params.mapId)) {
			throw Error('Map ID malformed');
		}

		// @TODO eventually this will be strictly UUIDs
		if (!params.regionId /*|| !isUUID(params.regionId)*/) {
			throw Error('Region ID malformed');
		}

		const region = await getRegion(params.regionId);

		if (isUUID(params.regionId)) {
			// @TODO this is mostly for TS's benefit (getRegion handles it already)
			// and shouldn't be necessary after HC is gone
			if (!region || !('id' in region)) {
				// @TODO probably make this a 404 page
				throw Error('Region not found');
			}

			return {
				regionId: region.id,
				region: region,
			};
		} else {
			return {
				regionId: params.regionId,
				region: region,
			};
		}
	} catch (e) {
		console.error(getMessage(e));
		let redirectPath = '/campaign';
		if (params.campaignId && isUUID(params.campaignId)) {
			redirectPath = redirectPath.concat(`/${params.campaignId}`);
		}
		if (params.mapId && isUUID(params.mapId)) {
			redirectPath = redirectPath.concat(`/map/${params.mapId}`);
		}
		return redirect(redirectPath);
	}
}
