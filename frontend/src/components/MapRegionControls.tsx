import { ActionIcon } from '@mantine/core';
import { IconCheck, IconSquarePlus2, IconX } from '@tabler/icons-react';
import { useContext } from 'react';
import {
	RegionContext,
	RegionDispatchContext,
} from '../contexts/RegionContext.ts';
import { isHardCoded } from '../reducers/regionReducer.ts';

const MapRegionControls: React.FC = () => {
	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	if (!regionState.region || isHardCoded(regionState.region)) {
		throw Error('Region controls accessed outside of the context of a region');
	}

	const handleAddRectangleClick = () => {
		regionDispatch({
			type: 'added_region_shape',
			shapeType: 'Rectangle',
		});
	};

	const handleCancelRegionClick = () => {
		history.back();
		regionDispatch({
			type: 'canceled_region',
		});
	};

	const handleFinishRegionClick = () => {
		regionDispatch({
			type: 'finished_editing_region_shapes',
		});
	};

	return (
		<>
			<ActionIcon
				title="Add Rectangle"
				variant="filled"
				color="cyan"
				radius="xl"
				size="xl"
				onClick={handleAddRectangleClick}
			>
				<IconSquarePlus2 />
			</ActionIcon>
			<ActionIcon
				title="Cancel Changes"
				variant="filled"
				color="gray"
				radius="xl"
				size="xl"
				onClick={handleCancelRegionClick}
			>
				<IconX />
			</ActionIcon>
			<ActionIcon
				title="Finish Region"
				variant="filled"
				radius="xl"
				size="xl"
				onClick={handleFinishRegionClick}
				disabled={regionState.region.shapes.length === 0}
			>
				<IconCheck />
			</ActionIcon>
		</>
	);
};

export default MapRegionControls;
