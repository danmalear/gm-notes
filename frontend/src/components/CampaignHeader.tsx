import { CampaignResponse as Campaign } from '#dtos/Campaign.js';
import { AppShell, Flex } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { NavLink } from 'react-router';

export interface CampaignHeaderProps extends React.PropsWithChildren {
	campaign: Campaign;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => {
	return (
		<AppShell.Header px="sm">
			<Flex direction="row" justify="space-between" align="center" h="100%">
				<NavLink
					to="/campaign"
					end
					style={{
						color: 'white',
						display: 'flex',
						justifyItems: 'center',
					}}
				>
					<IconArrowLeft size={32} />
				</NavLink>
				<h2>{campaign.name}</h2>
				<div />
			</Flex>
		</AppShell.Header>
	);
};

export default CampaignHeader;
