import { redirect, type LoaderFunctionArgs } from 'react-router';
import { getMessage } from '../helpers/error';
import { isUUID } from '../helpers/uuid.ts';
import { getCampaign } from './campaignService.ts';

export async function campaignLoader({ params }: LoaderFunctionArgs) {
	try {
		if (!params.campaignId || !isUUID(params.campaignId)) {
			throw Error('Campaign ID malformed');
		}
		const response = await getCampaign(params.campaignId);

		if (!response?.data?.data) {
			// @TODO probably make this a 404 page
			throw Error('Campaign not found');
		}

		return {
			campaign: response.data.data,
		};
	} catch (e) {
		console.error(getMessage(e));
		return redirect('/campaign');
	}
}
