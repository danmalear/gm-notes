import { Button, Card, Text, Title } from '@mantine/core';
import type React from 'react';
import './CampaignCard.css';

export interface CampaignCardProps extends React.PropsWithChildren {
	// Eventually this:
	// campaign: Campaign;
	imageUrl: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ imageUrl }) => {
	return (
		<Card
			shadow="md"
			p="xl"
			radius="md"
			style={{ backgroundImage: `url(${imageUrl})` }}
			className="card"
		>
			<div>
				<Text className="category" size="xs">
					Category Here
				</Text>
				<Title order={3} className="title">
					Title Here
				</Title>
			</div>
			<Button variant="white" color="dark">
				Read article
			</Button>
		</Card>
	);
};

export default CampaignCard;
