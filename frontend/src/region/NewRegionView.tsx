import { MapContext } from '#map/MapContext.ts';
import { useContext, useEffect } from 'react';
import { RegionContext, RegionDispatchContext } from './RegionContext.ts';
import { isExisting, isHardCoded } from './region-reducer.ts';

const NewRegionView: React.FC = () => {
	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	const map = useContext(MapContext).map;

	useEffect(() => {
		if (
			!regionState.region ||
			isHardCoded(regionState.region) ||
			isExisting(regionState.region)
		) {
			regionDispatch({
				type: 'added_region',
				mapId: map.id,
			});
		}
	}, [regionState.region, regionDispatch, map.id]);

	return (
		<div id={'new-region-data'} className="region-view p-2">
			{regionState.region ? (
				<h1>{regionState.region.name}</h1>
			) : (
				<h1>New Region</h1>
			)}
		</div>
	);
};

export default NewRegionView;
