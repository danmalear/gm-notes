// @TODO make header and navbar campaign - then have MapView take over main and aside
// import { AppShell, Box, ScrollArea } from '@mantine/core';
// import { useState } from 'react';
// import Map, { type MapArea } from '../components/Map.tsx';
// import RegionDetails from '../components/RegionDetails.tsx';
// import data from '../data/data.ts';
// import type { TimeOfDay, ValidPartySize } from '../data/MapData.ts';

import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router';
import { campaignLoader } from '../routes';

export default function CampaignView() {
	const { campaign } = useLoaderData<typeof campaignLoader>();

	useEffect(() => {
		console.log(JSON.stringify(campaign));
	}, [campaign]);

	return (
		<>
			<Outlet />
		</>
	);
	// const [currentMap, setCurrentMap] = useState('deathHouse');
	// const [currentRegion, setCurrentRegion] = useState('foyer');
	// const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
	// const [partySize] = useState<ValidPartySize>(3);
	// const mapData = currentMap ? data[currentMap] : null;

	// if (!mapData) {
	// 	return (
	// 		<div id="main" className="container">
	// 			<div id="map-col" className="item">
	// 				<div className="pos-absolute l-1 t-1">
	// 					<select
	// 						className="w-10"
	// 						value={currentMap}
	// 						onChange={(e) => setCurrentMap(e.target.value)}
	// 					>
	// 						<option value="">--</option>
	// 						<option value="deathHouse">Death House</option>
	// 					</select>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	// const areas: MapArea[] = [];

	// for (const region in mapData.regions) {
	// 	for (const area of mapData.regions[region].areas) {
	// 		areas.push({
	// 			shape: area.shape,
	// 			coords: area.coords,
	// 			regionKey: region,
	// 		});
	// 	}
	// }

	// const handleRegionClick = (regionKey: string) => {
	// 	setCurrentRegion(regionKey);
	// };

	// return (
	// 	<AppShell
	// 		id="app-shell"
	// 		header={{
	// 			height: 50,
	// 			collapsed: false,
	// 		}}
	// 		navbar={{
	// 			width: 200,
	// 			breakpoint: 'sm',
	// 			collapsed: {
	// 				desktop: false,
	// 				mobile: false,
	// 			},
	// 		}}
	// 		aside={{
	// 			width: 500,
	// 			breakpoint: 'md',
	// 			collapsed: {
	// 				desktop: false,
	// 				mobile: true,
	// 			},
	// 		}}
	// 		offsetScrollbars={true}
	// 	>
	// 		<AppShell.Header>
	// 			<div className="pos-absolute l-1 t-1 w-10 item">
	// 				<select
	// 					className="w-100"
	// 					value={currentMap}
	// 					onChange={(e) => setCurrentMap(e.target.value)}
	// 				>
	// 					<option value="">--</option>
	// 					<option value="deathHouse">Death House</option>
	// 				</select>
	// 			</div>
	// 			<div className="pos-absolute l-15 t-1 w-10">
	// 				<select
	// 					className="w-100"
	// 					value={timeOfDay}
	// 					onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
	// 				>
	// 					<option value="day">Day</option>
	// 					<option value="between">Between</option>
	// 					<option value="night">Night</option>
	// 				</select>
	// 			</div>
	// 		</AppShell.Header>
	// 		<AppShell.Navbar>
	// 			<Box h="100%" w="100%" />
	// 		</AppShell.Navbar>
	// 		<AppShell.Main h="100%">
	// 			<ScrollArea>
	// 				<Map
	// 					mapImage={mapData.image}
	// 					areas={areas}
	// 					onRegionClick={handleRegionClick}
	// 				/>
	// 			</ScrollArea>
	// 		</AppShell.Main>
	// 		<AppShell.Aside>
	// 			<AppShell.Section grow component={ScrollArea}>
	// 				<RegionDetails
	// 					regionKey={currentRegion}
	// 					data={mapData.regions[currentRegion]}
	// 					timeOfDay={timeOfDay}
	// 					partySize={partySize}
	// 				/>
	// 			</AppShell.Section>
	// 		</AppShell.Aside>
	// 	</AppShell>
	// );
}
