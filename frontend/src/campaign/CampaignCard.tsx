import { filePath } from '#file/fileService.ts';
import type { MapResponse as Map } from '#map/map-dtos.ts';
import { getMap } from '#map/mapService.ts';
import { Card, Title } from '@mantine/core';
import type { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { getMessage } from '../helpers/error.ts';
import type { CampaignStub as Campaign } from './campaign-dtos.ts';

export interface CampaignCardProps extends React.PropsWithChildren {
	campaign: Campaign;
	onOpenCampaignClicked: (campaignId: UUID) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
	campaign,
	onOpenCampaignClicked,
}) => {
	const { name } = campaign;
	const [map, setMap] = useState<Map | undefined>(undefined);

	useEffect(() => {
		if (campaign.activeMapId) {
			getMap(campaign.activeMapId)
				.then((res) => setMap(res.data.data))
				.catch((e) => {
					alert(`Error fetching active map: ${getMessage(e)}`);
					console.error(e);
				});
		}
	}, [campaign.activeMapId]);

	const imagePath = map?.imagePath ? filePath(map?.imagePath) : undefined;

	// @TODO Eventually make this customizable?
	const campaignColor = 'black';

	return (
		<Card
			shadow="md"
			p="lg"
			radius="md"
			style={{
				backgroundImage: imagePath
					? `linear-gradient(to bottom, ${campaignColor} 15%, 30%, transparent 40%), url(${imagePath})`
					: undefined,
			}}
			className="card"
			onClick={() => onOpenCampaignClicked(campaign.id)}
		>
			<Title order={2} className="title" ff="heading">
				{name}
			</Title>
		</Card>
	);
};

export default CampaignCard;
