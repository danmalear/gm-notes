import { CampaignResponse as Campaign } from '#dtos/Campaign.js';
import { AppShell, Flex, Tooltip } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { NavLink } from 'react-router';

export interface CampaignHeaderProps extends React.PropsWithChildren {
	campaign: Campaign;
	subtitle?: string;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
	campaign,
	subtitle,
}) => {
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
					<Tooltip label="Close Campaign" openDelay={500}>
						<IconX size={32} />
					</Tooltip>
				</NavLink>
				<h2>
					{campaign.name}
					{subtitle ? ` - ${subtitle}` : ''}
				</h2>
				<div />
			</Flex>
		</AppShell.Header>
	);
};

export default CampaignHeader;
