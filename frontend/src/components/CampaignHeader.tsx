import { CampaignResponse as Campaign } from '#dtos/Campaign.js';
import { AppShell } from '@mantine/core';

export interface CampaignHeaderProps extends React.PropsWithChildren {
	campaign: Campaign;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => {
	return <AppShell.Header>{campaign.name}</AppShell.Header>;
};

export default CampaignHeader;
