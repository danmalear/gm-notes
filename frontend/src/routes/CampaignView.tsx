import { Outlet, useLoaderData } from 'react-router';
import { CampaignContext } from '../contexts/CampaignContext.ts';
import { campaignLoader } from '../routes';

const CampaignView: React.FC = () => {
	const { campaign } = useLoaderData<typeof campaignLoader>();

	return (
		<CampaignContext value={campaign}>
			<Outlet />
		</CampaignContext>
	);
};

export default CampaignView;
