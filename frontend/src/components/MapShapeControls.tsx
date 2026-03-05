import { ActionIcon } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { type MouseEvent } from 'react';

export interface MapShapeControlsProps {
	submitDisabled?: boolean;
	onCancelShapeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	onFinishShapeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MapShapeControls: React.FC<MapShapeControlsProps> = ({
	submitDisabled = false,
	onCancelShapeClick,
	onFinishShapeClick,
}) => {
	return (
		<>
			<ActionIcon
				title="Cancel Changes"
				variant="filled"
				color="red"
				radius="xl"
				size="xl"
				onClick={onCancelShapeClick}
			>
				<IconX />
			</ActionIcon>
			<ActionIcon
				title="Finish Shape"
				variant="filled"
				radius="xl"
				size="xl"
				onClick={onFinishShapeClick}
				disabled={submitDisabled}
			>
				<IconCheck />
			</ActionIcon>
		</>
	);
};

export default MapShapeControls;
