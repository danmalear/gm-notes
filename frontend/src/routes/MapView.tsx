import type { Lighting } from '#dtos/data-types.ts';
import type { MapUpdate } from '#dtos/map.js';
import type { RegionCreate, RegionResponse, Shape } from '#dtos/region.ts';
import { ActionIcon, AppShell, Group, ScrollArea } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useCallback, useMemo, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { href, Outlet, useLoaderData, useNavigate } from 'react-router';
import AppHeader from '../components/AppHeader.tsx';
import Map, { type MapArea } from '../components/Map.tsx';
import MapNavbar from '../components/MapNavbar.tsx';
import MapRegionControls from '../components/MapRegionControls.tsx';
import MapShapeControls from '../components/MapShapeControls.tsx';
import { LegacyContext } from '../contexts/LegacyContext.ts';
import { MapContext, type Transform } from '../contexts/MapContext.ts';
import data from '../data/data.ts';
import type { TimeOfDay } from '../data/MapData.ts';
import { getMessage } from '../helpers/error.ts';
import { isRectangle, type ShapeType } from '../helpers/shapes.ts';
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
	const [activeRegion, setActiveRegion] = useState<
		RegionResponse | RegionCreate | null
	>(null);
	const [newShapeType, setNewShapeType] = useState<ShapeType | null>(null);
	const [activeShape, setActiveShape] = useState<Shape | null>(null);
	const [revertShape, setRevertShape] = useState<Shape | null>(null);

	// @TODO Add full functionality
	const handleAddRegionClick = () => {
		setActiveRegion({
			mapId: map.id,
			name: '',
			rectangles: [],
			circles: [],
			polygons: [],
		});
	};

	const handleCancelRegionClick = () => {
		setActiveRegion(null);
	};

	const handleFinishRegionClick = () => {
		if (!activeRegion) {
			console.error(
				'ERROR: Finish region clicked outside the context of editing a region',
			);
			return;
		}
		setActiveRegion(null);
	};

	const handleAddRectangleClick = () => {
		setNewShapeType('Rectangle');
	};

	const handleCancelShapeClick = () => {
		if (!activeRegion) {
			console.error(
				'ERROR: Cancel shape clicked outside the context of editing a region',
			);
			return;
		}
		if (revertShape && isRectangle(revertShape)) {
			activeRegion.rectangles = [...activeRegion.rectangles, revertShape];
		}
		setNewShapeType(null);
		setRevertShape(null);
		setActiveShape(null);
	};

	const handleDeleteShapeClick = () => {
		if (!activeRegion) {
			console.error(
				'ERROR: Delete shape clicked outside the context of editing a shape',
			);
			return;
		}
		setNewShapeType(null);
		setRevertShape(null);
		setActiveShape(null);
	};

	const handleFinishShapeClick = () => {
		if (!activeRegion || !activeShape) {
			console.error(
				'ERROR: Finish shape clicked outside the context of editing a shape',
			);
			return;
		}
		if (isRectangle(activeShape)) {
			activeRegion.rectangles = [...activeRegion.rectangles, activeShape];
		}
		setRevertShape(null);
		setActiveShape(null);
	};

	const handleShapeSelected = (shape: Shape) => {
		if (!activeRegion) throw Error('handleShapeSelected called out of context');
		setNewShapeType(null);
		const existingShape = activeRegion.rectangles.find(
			(rect) => rect === shape,
		);
		setRevertShape(existingShape ? { ...existingShape } : null);
		setActiveShape(shape);
		if (isRectangle(shape)) {
			activeRegion.rectangles = activeRegion.rectangles.filter(
				(rect) => rect !== shape,
			);
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
							disablePan={!!newShapeType || !!activeShape}
							value={transform}
							onChange={(value) => {
								setTransform(value);
							}}
						>
							{mapDataHC ? (
								<Map
									activeRegion={activeRegion}
									activeShape={activeShape ?? undefined}
									newShapeType={newShapeType}
									mapImagePath={map.imagePath}
									areas={areas.concat(areasHC)}
									onRegionClick={handleRegionClick}
									onShapeSelected={handleShapeSelected}
									onShapeChange={setActiveShape}
								/>
							) : null}
						</MapInteractionCSS>
						<Group
							pos="absolute"
							bottom={0}
							right="var(--app-shell-aside-offset)"
							m="sm"
						>
							{activeRegion ? (
								activeShape || newShapeType ? (
									<MapShapeControls
										submitDisabled={!!newShapeType}
										deleteDisabled={!revertShape}
										onCancelShapeClick={handleCancelShapeClick}
										onDeleteShapeClick={handleDeleteShapeClick}
										onFinishShapeClick={handleFinishShapeClick}
									/>
								) : (
									<MapRegionControls
										submitDisabled={activeRegion.rectangles.length === 0}
										onAddNewRectangleClick={handleAddRectangleClick}
										onCancelRegionClick={handleCancelRegionClick}
										onFinishRegionClick={handleFinishRegionClick}
									/>
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
		</MapContext>
	);
};

export default MapView;
