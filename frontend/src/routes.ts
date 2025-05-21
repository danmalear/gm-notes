import { createBrowserRouter } from 'react-router';
import MapView from './MapView';

const router = createBrowserRouter([
	{
		path: '/',
		Component: MapView,
	},
]);

export default router;
