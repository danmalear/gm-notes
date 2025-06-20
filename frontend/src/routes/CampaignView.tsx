import { Outlet, useLoaderData } from 'react-router';
import { CampaignContext } from '../contexts/CampaignContext.ts';
import type { campaignLoader } from './loaders/campaignLoader.ts';

const CampaignView: React.FC = () => {
	const { campaign } = useLoaderData<typeof campaignLoader>();

	return (
		<CampaignContext value={campaign}>
			<Outlet />
		</CampaignContext>
	);
};

export default CampaignView;
