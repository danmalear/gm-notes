import { createBrowserRouter, redirect } from 'react-router';
import CampaignsView from './routes/CampaignsView';
import CampaignView from './routes/CampaignView';
import { campaignLoader } from './routes/loaders/campaignLoader';
import { mapLoader } from './routes/loaders/mapLoader';
import MapView from './routes/MapView';

const router = createBrowserRouter([
	{
		path: '/',
		Component: () => null,
		loader: () => {
			return redirect('/campaign');
		},
	},
	{
		path: 'campaign',
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
						path: 'map/:mapId?',
						loader: mapLoader,
						Component: MapView,
					},
				],
			},
		],
	},
]);

export default router;
