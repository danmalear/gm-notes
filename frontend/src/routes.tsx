import {
	createBrowserRouter,
	redirect,
	type LoaderFunctionArgs,
} from 'react-router';
import { getMessage } from './helpers/error';
import { isUUID } from './helpers/uuid';
import CampaignsView from './routes/CampaignsView';
import CampaignView from './routes/CampaignView';
import MapView from './routes/MapView';
import { getCampaign } from './services/campaignService';

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

const router = createBrowserRouter([
	{
		path: '/',
		Component: () => null,
		loader: () => {
			return redirect('/campaign');
		},
	},
	{
		path: '/campaign',
		children: [
			{
				index: true,
				Component: CampaignsView,
			},
			{
				path: ':campaignId',
				loader: campaignLoader,
				Component: CampaignView,
				children: [
					{
						path: 'map/:id?',
						Component: MapView,
					},
				],
			},
		],
	},
]);

export default router;
