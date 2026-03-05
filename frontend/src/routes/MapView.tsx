import type { Lighting } from '#dtos/data-types.ts';
import type { MapUpdate } from '#dtos/map.js';
import type { RegionCreate, Shape } from '#dtos/region.ts';
import { ActionIcon, AppShell, Group, ScrollArea } from '@mantine/core';
import {
	IconCheck,
	IconPlus,
	IconSquarePlus2,
	IconX,
} from '@tabler/icons-react';
import { useCallback, useMemo, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { href, Outlet, useLoaderData, useNavigate } from 'react-router';
import AppHeader from '../components/AppHeader.tsx';
import Map, { type MapArea } from '../components/Map.tsx';
import MapNavbar from '../components/MapNavbar.tsx';
import { LegacyContext } from '../contexts/LegacyContext.ts';
import { MapContext, type Transform } from '../contexts/MapContext.ts';
import data from '../data/data.ts';
import type { TimeOfDay } from '../data/MapData.ts';
import { getMessage } from '../helpers/error.ts';
import { isRectangle } from '../helpers/shapes.ts';
import { updateMap } from '../services/mapService.ts';
import type { mapLoader } from './loaders/mapLoader.ts';

// HC = hard-coded, to be deleted when data is properly loaded

const MapView: React.FC = () => {
	const navigate = useNavigate();

	// @TODO remove this dependency
	const [timeOfDayHC, setTimeOfDayHC] = useState<TimeOfDay>('night');

	const [map, setMap] = useState(useLoaderData<typeof mapLoader>().map);

	const [transform, setTransform] = useState<Transform>({
		scale: 1,
		translation: { x: 0, y: 0 },
	});

	// #region editing
	const [newRegion, setNewRegion] = useState<RegionCreate | null>(null);
	const [isAddingNewRectangle, setIsAddingNewRectangle] = useState(false);

	// @TODO Add full functionality
	const handleAddRegionClick = () => {
		setNewRegion({
			mapId: map.id,
			name: '',
			rectangles: [],
		});
	};

	const handleCancelRegionClick = () => {
		if (!newRegion) {
			console.error(
				'ERROR: Cancel region clicked outside the context of editing a region',
			);
			return;
		}
		setNewRegion(null);
	};

	const handleFinishRegionClick = () => {
		if (!newRegion) {
			console.error(
				'ERROR: Finish region clicked outside the context of editing a region',
			);
			return;
		}
		setNewRegion(null);
	};

	const handleAddRectangleClick = () => {
		setIsAddingNewRectangle(true);
	};

	const handleNewShapeAdded = (shape: Shape) => {
		if (!newRegion) throw Error('handleNewShapeAdded called out of context');
		setIsAddingNewRectangle(false);
		console.log('New shape added:', JSON.stringify(shape));
		if (isRectangle(shape)) {
			newRegion.rectangles = [...newRegion.rectangles, shape];
		}
	};
	// #endregion editing

	const update = useCallback(async (updatedValues: MapUpdate) => {
		try {
			const response = await updateMap(updatedValues);

			if (!response?.data?.data) {
				throw Error('Map not found');
			}

			setMap(response.data.data);
		} catch (e) {
			alert('Error reloading map');
			console.error(getMessage(e));
		}
	}, []);

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
			for (const polygon of region.polygons) {
				acc.push({
					shape: 'poly',
					coords: polygon,
					regionId: region.id,
				});
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

	const handleRegionClick = (regionId: string) => {
		navigate(href('region/:regionId', { regionId }));
	};

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
		<MapContext value={{ map, transform }}>
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
							disablePan={!!isAddingNewRectangle}
							value={transform}
							onChange={(value) => {
								setTransform(value);
							}}
						>
							{mapDataHC ? (
								<Map
									region={newRegion}
									isEditing={!!newRegion}
									isAddingNewRectangle={isAddingNewRectangle}
									mapImagePath={map.imagePath}
									areas={areas.concat(areasHC)}
									onRegionClick={handleRegionClick}
									onNewShapeAdded={handleNewShapeAdded}
								/>
							) : null}
						</MapInteractionCSS>
						<Group
							pos="absolute"
							bottom={0}
							right="var(--app-shell-aside-offset)"
							m="sm"
						>
							{newRegion ? (
								// @TODO extract into controls component
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
										color="red"
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
										disabled={newRegion.rectangles.length === 0}
									>
										<IconCheck />
									</ActionIcon>
								</>
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
		</MapContext>
	);
};

export default MapView;
