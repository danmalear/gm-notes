import { filePath } from '#file/file-service.ts';
import type { MapResponse } from '#map/map-dtos.ts';
import { Card, Title } from '@mantine/core';
import type { UUID } from 'crypto';

export interface MapCardProps extends React.PropsWithChildren {
	map: MapResponse;
	onOpenMapClicked: (campaignId: UUID) => void;
}

const MapCard: React.FC<MapCardProps> = ({
	map,
	onOpenMapClicked: onOpenMapClicked,
}) => {
	const { name } = map;

	const imagePath = filePath(map.imagePath);

	// @TODO Eventually make this customizable?
	const mapColor = 'black';

	return (
		<Card
			shadow="md"
			p="lg"
			radius="md"
			style={{
				backgroundImage: imagePath
					? `linear-gradient(to bottom, ${mapColor} 15%, 30%, transparent 40%), url(${imagePath})`
					: undefined,
			}}
			className="card"
			onClick={() => onOpenMapClicked(map.id)}
		>
			<Title order={2} className="title" ff="heading">
				{name}
			</Title>
		</Card>
	);
};

export default MapCard;
