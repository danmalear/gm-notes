import type { CampaignResponse as Campaign } from '#dtos/Campaign.ts';
import { Card, Title } from '@mantine/core';
import type { UUID } from 'crypto';
import type React from 'react';
import { useMemo } from 'react';
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

	const map = useMemo(
		() =>
			campaign.maps.length
				? campaign.activeMapId
					? (campaign.maps.find((map) => map.id === campaign.activeMapId) ??
						campaign.maps[0])
					: campaign.maps[0]
				: undefined,
		[campaign.maps, campaign.activeMapId],
	);

	// @TODO Eventually make this customizable?
	const campaignColor = 'black';

	return (
		<Card
			shadow="md"
			p="lg"
			radius="md"
			style={{
				backgroundImage: map?.imagePath
					? `linear-gradient(to bottom, ${campaignColor} 15%, 30%, transparent 40%), url(${map.imagePath})`
					: undefined,
			}}
			className={classes.card}
			onClick={() => onOpenCampaignClicked(campaign.id)}
		>
			<Title order={2} className="title" ff="heading">
				{name}
			</Title>
		</Card>
	);
};

export default CampaignCard;
