import { Outlet, useLoaderData } from 'react-router';
import { CampaignContext } from '../contexts/CampaignContext.ts';
import { campaignLoader } from '../routes';

export default function CampaignView() {
	const { campaign } = useLoaderData<typeof campaignLoader>();

	return (
		<CampaignContext value={campaign}>
			<Outlet />
		</CampaignContext>
	);
}
