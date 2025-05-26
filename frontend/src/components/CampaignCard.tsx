import type { CampaignResponse as Campaign } from '#dtos/Campaign.ts';
import { Button, Card, Title } from '@mantine/core';
import type { UUID } from 'crypto';
import type React from 'react';
import classes from './CampaignCard.module.css';

export interface CampaignCardProps extends React.PropsWithChildren {
	campaign: Campaign;
	onOpenCampaignClicked: (campaignId: UUID) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
	campaign,
	onOpenCampaignClicked,
}) => {
	const { name } = campaign;

	const imagePath = campaign.maps.length
		? campaign.activeMapId
			? (campaign.maps.find((map) => map.id === campaign.activeMapId) ??
				campaign.maps[0])
			: campaign.maps[0]
		: undefined;

	return (
		<Card
			shadow="md"
			p="xl"
			radius="md"
			style={{ backgroundImage: `url(${imagePath})` }}
			className={classes.card}
		>
			<div>
				<Title order={3} className="title">
					{name}
				</Title>
			</div>
			<Button
				variant="white"
				color="dark"
				onClick={() => onOpenCampaignClicked(self.crypto.randomUUID())}
			>
				Open Campaign
			</Button>
		</Card>
	);
};

export default CampaignCard;
