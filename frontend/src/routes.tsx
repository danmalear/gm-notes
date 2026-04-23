import { campaignLoader } from '#campaign/campaign-loader.ts';
import CampaignsView from '#campaign/CampaignsView.tsx';
import CampaignView from '#campaign/CampaignView.tsx';
import { mapLoader } from '#map/map-loader.ts';
import MapsView from '#map/MapsView.tsx';
import MapView from '#map/MapView.tsx';
import NewRegionView from '#region/NewRegionView.tsx';
import { regionLoader } from '#region/region-loader.ts';
import RegionView from '#region/RegionView.tsx';
import { createBrowserRouter, redirect } from 'react-router';
import App from './App.tsx';

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
										path: 'region/new',
										Component: NewRegionView,
									},
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
