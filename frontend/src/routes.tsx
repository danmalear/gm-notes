import { createBrowserRouter, redirect } from 'react-router';
import App from './App.tsx';
import CampaignsView from './routes/CampaignsView.tsx';
import CampaignView from './routes/CampaignView.tsx';
import { campaignLoader } from './routes/loaders/campaignLoader.ts';
import { mapLoader } from './routes/loaders/mapLoader.ts';
import { regionLoader } from './routes/loaders/regionLoader.ts';
import MapsView from './routes/MapsView.tsx';
import MapView from './routes/MapView.tsx';
import RegionView from './routes/RegionView.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
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
								index: true,
								loader: () => {
									return redirect('map');
								},
							},
							{
								path: 'map/:mapId',
								loader: mapLoader,
								Component: MapView,
								children: [
									{
										path: 'region/:regionId',
										loader: regionLoader,
										Component: RegionView,
									},
								],
							},
							{
								path: 'map/',
								Component: MapsView,
							},
						],
					},
				],
			},
		],
	},
]);

export default router;
