import { ActionIcon } from '@mantine/core';
import { IconCheck, IconSquarePlus2, IconX } from '@tabler/icons-react';
import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
	RegionContext,
	RegionDispatchContext,
} from '../contexts/RegionContext.ts';
import { scaleShape } from '../helpers/shapes.ts';
import { isHardCoded } from '../reducers/regionReducer.ts';
import { createRegion } from '../services/regionService.ts';
import { MapContext, MapDispatchContext } from './MapContext.ts';

const MapRegionControls: React.FC = () => {
	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	const mapState = useContext(MapContext);
	const mapDispatch = useContext(MapDispatchContext);

	const navigate = useNavigate();

	const region = useMemo(() => {
		if (!regionState.region || isHardCoded(regionState.region)) {
			throw Error(
				'Region controls accessed outside of the context of a region',
			);
		}
		return regionState.region;
	}, [regionState.region]);

	const handleAddRectangleClick = () => {
		regionDispatch({
			type: 'added_region_shape',
			shapeType: 'Rectangle',
		});
	};

	const navigateToLastRegion = () => {
		navigate(`region/${regionState.revertRegionId ?? '..'}`, {
			relative: 'path',
		});
	};

	const handleCancelRegionClick = () => {
		navigateToLastRegion();
	};

	const handleFinishRegionClick = () => {
		regionDispatch({
			type: 'finished_editing_region_shapes',
		});
		const scaledShapes = region.shapes.map((shape) =>
			scaleShape(
				shape,
				{
					from: {
						width: mapState.imgWidth ?? mapState.map.width,
						height: mapState.imgHeight ?? mapState.map.height,
					},
					to: {
						width: mapState.map.width,
						height: mapState.map.height,
					},
				},
				{
					round: true,
				},
			),
		);
		const scaledRegion: typeof region = {
			...region,
			shapes: scaledShapes,
		};
		if ('id' in scaledRegion) {
			// @TODO handle existing update
		} else {
			createRegion(scaledRegion)
				.then((response) => {
					const newRegion = response.data.data;
					mapDispatch({
						type: 'created_region',
						region: newRegion,
					});
					navigate(`region/${newRegion.id}`, {
						relative: 'path',
					});
				})
				.catch((e) => {
					console.error('ERROR: ', e);
					alert('Error creating new region (see console for details)');
				});
		}
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
				disabled={region.shapes.length === 0}
			>
				<IconCheck />
			</ActionIcon>
		</>
	);
};

export default MapRegionControls;
