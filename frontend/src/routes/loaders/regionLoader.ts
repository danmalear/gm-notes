import { redirect, type LoaderFunctionArgs } from 'react-router';
import data from '../../data/data.ts';
import { getMessage } from '../../helpers/error.ts';
import { isUUID } from '../../helpers/uuid.ts';
import { getRegion } from '../../services/regionService.ts';

// @TODO remove this dependency
const mapDataHC = data.deathHouse;

export async function regionLoader({ params }: LoaderFunctionArgs) {
	console.log('regionLoader called. regionId:', params.regionId);
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

		if (isUUID(params.regionId)) {
			const response = await getRegion(params.regionId);

			if (!response?.data?.data) {
				// @TODO probably make this a 404 page
				throw Error('Region not found');
			}

			return {
				regionId: response.data.data.id,
				region: response.data.data,
			};
		} else {
			return {
				regionId: params.regionId,
				region: mapDataHC.regions[params.regionId],
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
