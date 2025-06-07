import { createBrowserRouter, redirect } from 'react-router';
import CampaignsView from './routes/CampaignsView';
import MapView from './routes/MapView';

const router = createBrowserRouter([
	{
		path: '/',
		Component: () => <></>,
		loader: () => {
			return redirect('/campaigns');
		},
	},
	{
		path: '/campaigns',
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
						path: 'map/:id?',
						Component: MapView,
					},
				],
			},
		],
	},
]);

export default router;
