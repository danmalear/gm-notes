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
	const [selectedRegionId, setCurrentRegion] = useState('foyer');
	// @TODO this should eventually be a stored campaign state
	const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
	// @TODO this should eventually be a stored campaign state
	const [partySize] = useState<ValidPartySize>(3);

	const areas = useMemo(() => {
		const acc: MapArea[] = [];

		for (const region of map.regions) {
			for (const circle of region.circles) {
				acc.push({
					shape: 'circle',
					coords: circle,
					regionId: region.id,
				});
			}
			for (const rectangle of region.rectangles) {
				acc.push({
					shape: 'rect',
					coords: rectangle,
					regionId: region.id,
				});
			}
			// @TODO support polygons
			// for (const polygon of region.polygons) {
			// acc.push({
			// 	shape: 'poly',
			// 	coords:
			// 	regionId:
			// });
			// }
		}

		return acc;
	}, [map]);

	// #region HC
	// @TODO remove this dependency
	const [currentMapHC, setCurrentMapHC] = useState('deathHouse');

	// @TODO remove this dependency
	const mapDataHC = currentMapHC ? data[currentMapHC] : null;

	// @TODO remove this dependency
	const areasHC = useMemo(() => {
		if (!mapDataHC) return [];

		const acc: MapArea[] = [];

		for (const region in mapDataHC.regions) {
			for (const area of mapDataHC.regions[region]!.areas) {
				// This is bizarre but makes TS happy and is deprecated anyway
				if (area.shape === 'rect') {
					acc.push({
						shape: area.shape,
						coords: area.coords,
						regionId: region,
					});
				} else {
					acc.push({
						shape: area.shape,
						coords: area.coords,
						regionId: region,
					});
				}
			}
		}

		return acc;
	}, [mapDataHC]);

	// #endregion HC

	const handleRegionClick = (regionId: string) => {
		setCurrentRegion(regionId);
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
						<NavLink label="Change Map" component="div" />
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
							areas={areas.concat(areasHC)}
							onRegionClick={handleRegionClick}
						/>
					) : null}
				</MapInteractionCSS>
			</AppShell.Main>
			<AppShell.Aside>
				{mapDataHC ? (
					<AppShell.Section grow component={ScrollArea}>
						<RegionDetails
							regionId={selectedRegionId}
							mapDataHC={mapDataHC}
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
