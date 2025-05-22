import { Button, Card, Text, Title } from '@mantine/core';
import type { UUID } from 'crypto';
import type React from 'react';
import classes from './CampaignCard.module.css';

export interface CampaignCardProps extends React.PropsWithChildren {
	// Eventually this:
	// campaign: Campaign;
	imageUrl: string;
	name: string;
	onOpenCampaignClicked: (campaignId: UUID) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
	imageUrl,
	name,
	onOpenCampaignClicked,
}) => {
	return (
		<Card
			shadow="md"
			p="xl"
			radius="md"
			style={{ backgroundImage: `url(${imageUrl})` }}
			className={classes.card}
		>
			<div>
				<Text className="category" size="xs">
					Category Here
				</Text>
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
