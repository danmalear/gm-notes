import { ActionIcon } from '@mantine/core';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { type MouseEvent } from 'react';

export interface MapShapeControlsProps {
	submitDisabled?: boolean;
	deleteDisabled?: boolean;
	onCancelShapeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	onDeleteShapeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	onFinishShapeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MapShapeControls: React.FC<MapShapeControlsProps> = ({
	submitDisabled = false,
	deleteDisabled = false,
	onCancelShapeClick,
	onDeleteShapeClick,
	onFinishShapeClick,
}) => {
	return (
		<>
			<ActionIcon
				title="Cancel Changes"
				variant="filled"
				color="gray"
				radius="xl"
				size="xl"
				onClick={onCancelShapeClick}
			>
				<IconX />
			</ActionIcon>
			<ActionIcon
				title="Delete Shape"
				variant="filled"
				color="red"
				radius="xl"
				size="xl"
				disabled={deleteDisabled}
				onClick={onDeleteShapeClick}
			>
				<IconTrash />
			</ActionIcon>
			<ActionIcon
				title="Finish Shape"
				variant="filled"
				radius="xl"
				size="xl"
				disabled={submitDisabled}
				onClick={onFinishShapeClick}
			>
				<IconCheck />
			</ActionIcon>
		</>
	);
};

export default MapShapeControls;
