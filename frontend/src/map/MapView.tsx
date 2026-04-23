import regionReducer, { isHardCoded } from '#region/region-reducer.ts';
import { RegionContext, RegionDispatchContext } from '#region/RegionContext.ts';
import { isCircle, isPolygon, isRectangle } from '#region/shape/shape-utils.ts';
import type { Lighting } from '#shared/data-types.ts';
import { getMessage } from '#shared/error.ts';
import { ActionIcon, AppShell, Group, ScrollArea } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router';
import AppHeader from '../components/AppHeader.tsx';
import data from '../legacy/data.ts';
import { LegacyContext } from '../legacy/LegacyContext.ts';
import type { TimeOfDay } from '../legacy/MapData.ts';
import type { MapUpdate } from './map-dtos.ts';
import type { mapLoader } from './map-loader.ts';
import mapReducer from './map-reducer.ts';
import { updateMap } from './map-service.ts';
import Map, { type MapArea } from './Map.tsx';
import { MapContext, MapDispatchContext } from './MapContext.ts';
import MapNavbar from './MapNavbar.tsx';
import MapRegionControls from './MapRegionControls.tsx';
import MapShapeControls from './MapShapeControls.tsx';

// HC = hard-coded, to be deleted when data is properly loaded

const MapView: React.FC = () => {
	// @TODO remove this dependency
	const [timeOfDayHC, setTimeOfDayHC] = useState<TimeOfDay>('night');

	const [mapState, mapDispatch] = useReducer(mapReducer, {
		map: useLoaderData<typeof mapLoader>().map,
		transform: {
			scale: 1,
			translation: { x: 0, y: 0 },
		},
	});

	const { map } = mapState;

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!location.pathname.includes('region')) {
			regionDispatch({ type: 'deselected_region' });
		}
	}, [location]);

	// #region editing
	const [regionState, regionDispatch] = useReducer(regionReducer, {
		isEditingRegion: false,
	});

	// @TODO Add full functionality
	const handleAddRegionClick = () => {
		navigate('region/new');
	};
	// #endregion editing

	const update = useCallback(async (updatedValues: MapUpdate) => {
		try {
			const response = await updateMap(updatedValues);

			if (!response?.data?.data) {
				throw Error('Map not found');
			}

			mapDispatch({
				type: 'updated_map',
				map: response.data.data,
			});
		} catch (e) {
			alert('Error reloading map');
			console.error(getMessage(e));
		}
	}, []);

	const areas = useMemo(() => {
		const acc: MapArea[] = [];

		for (const region of map.regions) {
			for (const shape of region.shapes) {
				if (isRectangle(shape)) {
					acc.push({
						shape: 'rect',
						coords: shape,
						regionId: region.id,
					});
				} else if (isCircle(shape)) {
					acc.push({
						shape: 'circle',
						coords: shape,
						regionId: region.id,
					});
				} else if (isPolygon(shape)) {
					acc.push({
						shape: 'poly',
						coords: shape,
						regionId: region.id,
					});
				}
			}
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

	const [defaultLightingLoading, setDefaultLightingLoading] = useState(false);
	const handleDefaultLightingChange = (lighting: Lighting) => {
		setDefaultLightingLoading(true);
		update({
			id: map.id,
			defaultLighting: lighting,
		}).then(() => {
			setDefaultLightingLoading(false);
		});
	};

	return (
		<MapContext value={mapState}>
			<MapDispatchContext value={mapDispatch}>
				<RegionContext value={regionState}>
					<RegionDispatchContext value={regionDispatch}>
						<LegacyContext value={{ timeOfDay: timeOfDayHC }}>
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
								<AppHeader title={map.name} />
								<MapNavbar
									defaultLighting={map.defaultLighting}
									onDefaultLightingChanged={handleDefaultLightingChange}
									defaultLightingLoading={defaultLightingLoading}
									currentMapHC={currentMapHC}
									onCurrentMapChangedHC={setCurrentMapHC}
									timeOfDayHC={timeOfDayHC}
									onTimeOfDayChangedHC={setTimeOfDayHC}
								/>
								<AppShell.Main h="100%">
									<MapInteractionCSS
										minScale={0.75}
										maxScale={6}
										disablePan={
											!!regionState.newShapeType || !!regionState.regionShape
										}
										value={mapState.transform}
										onChange={(value) => {
											mapDispatch({
												type: 'updated_transform',
												transform: value,
											});
										}}
									>
										{mapDataHC ? (
											<Map
												mapImagePath={map.imagePath}
												areas={areas.concat(areasHC)}
											/>
										) : null}
									</MapInteractionCSS>
									<Group
										pos="absolute"
										bottom={0}
										right="var(--app-shell-aside-offset)"
										m="sm"
									>
										{regionState.isEditingRegion &&
										regionState.region &&
										!isHardCoded(regionState.region) ? (
											regionState.regionShape || regionState.newShapeType ? (
												<MapShapeControls />
											) : (
												<MapRegionControls />
											)
										) : (
											<ActionIcon
												title="Add New Region"
												variant="filled"
												radius="xl"
												size="xl"
												onClick={handleAddRegionClick}
											>
												<IconPlus />
											</ActionIcon>
										)}
									</Group>
								</AppShell.Main>
								<AppShell.Aside>
									{mapDataHC ? (
										<AppShell.Section grow component={ScrollArea}>
											<Outlet />
										</AppShell.Section>
									) : null}
								</AppShell.Aside>
							</AppShell>
						</LegacyContext>
					</RegionDispatchContext>
				</RegionContext>
			</MapDispatchContext>
		</MapContext>
	);
};

export default MapView;
