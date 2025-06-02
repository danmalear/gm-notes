import { createBrowserRouter } from 'react-router';
import CampaignsView from './routes/CampaignsView';
import MapView from './routes/MapView';

const router = createBrowserRouter([
	{
		path: '/campaigns?',
		children: [
			{
				index: true,
				Component: CampaignsView,
			},
			{
				path: ':campaignId',
				// @TODO loader
				children: [
					{
						path: 'map?',
						Component: MapView,
					},
				],
			},
		],
	},
]);

export default router;
