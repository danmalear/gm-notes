import { createBrowserRouter } from 'react-router';
import CampaignsView from './routes/CampaignsView';
import MapView from './routes/MapView';

const router = createBrowserRouter([
	{
		path: '/map?',
		Component: MapView,
	},
	{
		path: '/campaigns',
		Component: CampaignsView,
	},
]);

export default router;
