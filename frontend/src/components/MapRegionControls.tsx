import { ActionIcon } from '@mantine/core';
import { IconCheck, IconSquarePlus2, IconX } from '@tabler/icons-react';
import { type MouseEvent } from 'react';

export interface MapRegionControlsProps {
	submitDisabled?: boolean;
	onAddNewRectangleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	onCancelRegionClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	onFinishRegionClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MapRegionControls: React.FC<MapRegionControlsProps> = ({
	submitDisabled = false,
	onAddNewRectangleClick,
	onCancelRegionClick,
	onFinishRegionClick,
}) => {
	return (
		<>
			<ActionIcon
				title="Add Rectangle"
				variant="filled"
				color="cyan"
				radius="xl"
				size="xl"
				onClick={onAddNewRectangleClick}
			>
				<IconSquarePlus2 />
			</ActionIcon>
			<ActionIcon
				title="Cancel Changes"
				variant="filled"
				color="gray"
				radius="xl"
				size="xl"
				onClick={onCancelRegionClick}
			>
				<IconX />
			</ActionIcon>
			<ActionIcon
				title="Finish Region"
				variant="filled"
				radius="xl"
				size="xl"
				onClick={onFinishRegionClick}
				disabled={submitDisabled}
			>
				<IconCheck />
			</ActionIcon>
		</>
	);
};

export default MapRegionControls;
