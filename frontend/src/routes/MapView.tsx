import { AppShell, Box, NavLink, ScrollArea } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { Link, useLoaderData } from 'react-router';
import CampaignHeader from '../components/CampaignHeader.tsx';
import Map, { type MapArea } from '../components/Map.tsx';
import RegionDetails from '../components/RegionDetails.tsx';
import { CampaignContext } from '../contexts/CampaignContext.ts';
import data from '../data/data.ts';
import type { TimeOfDay, ValidPartySize } from '../data/MapData.ts';
import type { mapLoader } from './loaders/mapLoader.ts';

// HC = hard-coded, to be deleted when data is properly loaded

const MapView: React.FC = () => {
	const campaign = useContext(CampaignContext);
	const { map } = useLoaderData<typeof mapLoader>();
	// @TODO eventually this should be nullable with a map default state
	const [currentRegion, setCurrentRegion] = useState('foyer');
	// @TODO this should eventually be a stored campaign state
	const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
	// @TODO this should eventually be a stored campaign state
	const [partySize] = useState<ValidPartySize>(3);

	// #region HC
	// @TODO remove this dependency
	const [currentMapHC, setCurrentMapHC] = useState('deathHouse');

	// @TODO remove this dependency
	const mapDataHC = currentMapHC ? data[currentMapHC] : null;

	const areasHC: MapArea[] = useMemo(() => {
		if (!mapDataHC) return [];

		const acc = [];

		for (const region in mapDataHC.regions) {
			for (const area of mapDataHC.regions[region].areas) {
				acc.push({
					shape: area.shape,
					coords: area.coords,
					regionId: region,
				});
			}
		}

		return acc;
	}, [mapDataHC]);

	// #endregion HC

	const handleRegionClick = (regionKey: string) => {
		setCurrentRegion(regionKey);
	};

	return (
		<AppShell
			id="app-shell"
			header={{
				height: 50,
				collapsed: false,
			}}
			navbar={{
				width: 200,
				breakpoint: 'sm',
				collapsed: {
					desktop: false,
					mobile: false,
				},
			}}
			aside={{
				width: 500,
				breakpoint: 'md',
				collapsed: {
					desktop: false,
					mobile: true,
				},
			}}
			offsetScrollbars={true}
			h="100vh"
		>
			<CampaignHeader campaign={campaign} subtitle={map.name} />
			<AppShell.Navbar>
				<Box h="100%" w="100%">
					<Link to={`/campaign/${campaign.id}/map`}>
						<NavLink label="Change Map" />
					</Link>
					<select
						className="w-100"
						value={currentMapHC}
						onChange={(e) => setCurrentMapHC(e.target.value)}
					>
						<option value="">--</option>
						<option value="deathHouse">Death House</option>
					</select>
					<select
						className="w-100"
						value={timeOfDay}
						onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
					>
						<option value="day">Day</option>
						<option value="between">Between</option>
						<option value="night">Night</option>
					</select>
				</Box>
			</AppShell.Navbar>
			<AppShell.Main h="100%">
				<MapInteractionCSS minScale={0.75} maxScale={6}>
					{mapDataHC ? (
						<Map
							mapImagePath={map.imagePath}
							areas={areasHC}
							onRegionClick={handleRegionClick}
						/>
					) : null}
				</MapInteractionCSS>
			</AppShell.Main>
			<AppShell.Aside>
				{mapDataHC ? (
					<AppShell.Section grow component={ScrollArea}>
						<RegionDetails
							regionKey={currentRegion}
							data={mapDataHC.regions[currentRegion]}
							timeOfDay={timeOfDay}
							partySize={partySize}
						/>
					</AppShell.Section>
				) : null}
			</AppShell.Aside>
		</AppShell>
	);
};

export default MapView;
