import { CampaignResponse as Campaign } from '#dtos/Campaign.js';
import { AppShell, Flex } from '@mantine/core';

export interface CampaignHeaderProps extends React.PropsWithChildren {
	campaign: Campaign;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => {
	return (
		<AppShell.Header>
			<Flex direction="row" justify="space-between" align="center" h="100%">
				<div />
				<h2>{campaign.name}</h2>
				<div />
			</Flex>
		</AppShell.Header>
	);
};

export default CampaignHeader;
