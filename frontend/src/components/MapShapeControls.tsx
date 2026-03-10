import { ActionIcon } from '@mantine/core';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useContext } from 'react';
import {
	RegionContext,
	RegionDispatchContext,
} from '../contexts/RegionContext.ts';

const MapShapeControls: React.FC = () => {
	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	const handleCancelShapeClick = () => {
		regionDispatch({
			type: 'canceled_region_shape',
		});
	};

	const handleDeleteShapeClick = () => {
		regionDispatch({
			type: 'deleted_region_shape',
		});
	};

	const handleFinishShapeClick = () => {
		regionDispatch({
			type: 'finished_editing_region_shape',
		});
	};

	return (
		<>
			<ActionIcon
				title="Cancel Changes"
				variant="filled"
				color="gray"
				radius="xl"
				size="xl"
				onClick={handleCancelShapeClick}
			>
				<IconX />
			</ActionIcon>
			<ActionIcon
				title="Delete Shape"
				variant="filled"
				color="red"
				radius="xl"
				size="xl"
				disabled={!regionState.revertShape}
				onClick={handleDeleteShapeClick}
			>
				<IconTrash />
			</ActionIcon>
			<ActionIcon
				title="Finish Shape"
				variant="filled"
				radius="xl"
				size="xl"
				disabled={!!regionState.newShapeType}
				onClick={handleFinishShapeClick}
			>
				<IconCheck />
			</ActionIcon>
		</>
	);
};

export default MapShapeControls;
