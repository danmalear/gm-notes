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
	if (!params.campaignId || !isUUID(params.campaignId)) {
		return {};
	}

	return {
		campaign: await getCampaign(params.campaignId),
	};
}

const router = createBrowserRouter([
	{
		path: '/',
		Component: () => <></>,
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
				loader: async ({ params }) => {
					try {
						if (!params.campaignId || !isUUID(params.campaignId)) {
							throw Error('Campaign ID malformed');
						}
						const campaign = await getCampaign(params.campaignId);
						return {
							campaign,
						};
					} catch (e) {
						console.error(getMessage(e));
						redirect('/campaign');
					}
				},
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
