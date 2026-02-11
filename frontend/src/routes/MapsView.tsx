import type { MapCreate, MapResponse } from '#dtos/Map.js';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon, AppShell, Box, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import type { UUID } from 'crypto';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CampaignHeader from '../components/CampaignHeader.tsx';
import MapCard from '../components/MapCard.tsx';
import CreateMapModal from '../components/modals/CreateMapModal.tsx';
import { CampaignContext } from '../contexts/CampaignContext.ts';
import { getMessage } from '../helpers/error.ts';
import { getMapsByCampaignId, insertMap } from '../services/mapService.ts';
import classes from './CampaignsView.module.css';

const MapsView: React.FC = () => {
	const navigate = useNavigate();
	const campaign = useContext(CampaignContext);

	const [maps, setMaps] = useState<MapResponse[]>([]);

	useEffect(() => {
		getMapsByCampaignId(campaign.id)
			.then((response) => {
				setMaps(response.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(`Error fetching maps: ${getMessage(e)}`);
			});
	}, [campaign.id]);

	const handleOpenMapClicked = (mapId: UUID) => {
		const selectedMap = maps.find((c) => c.id === mapId);

		if (!selectedMap) {
			throw Error('Selected map does not exist');
		}

		navigate(mapId);
	};

	// #region Create map stuff
	const [createMapOpened, { open: openCreateMap, close: closeCreateMap }] =
		useDisclosure(false);

	const handleAddMapClicked: React.MouseEventHandler<HTMLButtonElement> = (
		e,
	) => {
		e.preventDefault();
		openCreateMap();
	};

	const handleMapCreated = async (map: MapCreate) => {
		try {
			const response = await insertMap(map);
			const newMap = response.data.data;
			navigate(newMap.id);
		} catch (e) {
			console.error(e);
			alert(`Error creating map: ${getMessage(e)}`);
		}
	};

	// #endregion Create campaign stuff

	// prevent highlighting text while dragging
	const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent,
	) => {
		e.preventDefault();
	};

	// #region Slides
	const slides = maps.map((map) => (
		<Carousel.Slide key={map.id}>
			<MapCard map={map} onOpenMapClicked={handleOpenMapClicked} />
		</Carousel.Slide>
	));

	const spacer = (
		<Carousel.Slide style={{ flexShrink: 1 }}>
			<Box w={50} />
		</Carousel.Slide>
	);

	const addNew = (
		<Carousel.Slide>
			<ActionIcon
				id={classes['add-campaign']}
				variant="outline"
				color="gray"
				h="100%"
				w="100%"
				style={{
					borderStyle: 'dashed',
				}}
				onClick={handleAddMapClicked}
			>
				<IconPlus />
			</ActionIcon>
		</Carousel.Slide>
	);
	// #endregion Slides

	return (
		<>
			<CreateMapModal
				campaignId={campaign.id}
				opened={createMapOpened}
				onClose={closeCreateMap}
				onCreate={handleMapCreated}
			/>
			<AppShell
				id="app-shell"
				h="100vh"
				w="100vw"
				header={{
					height: 50,
					collapsed: false,
				}}
				offsetScrollbars={true}
			>
				<CampaignHeader campaign={campaign} subtitle="Maps" />
				<AppShell.Main h="100%" w="100%">
					<Flex
						h="100%"
						w="100%"
						px="20%"
						direction={'column'}
						justify={'center'}
						onMouseDown={handleMouseDown}
					>
						<Carousel
							slideSize="520px"
							slideGap={20}
							withControls={false}
							height="500px"
							emblaOptions={{
								dragFree: true,
							}}
							className={classes['gradient-mask']}
						>
							{spacer}
							{slides}
							{addNew}
							{spacer}
						</Carousel>
					</Flex>
				</AppShell.Main>
			</AppShell>
		</>
	);
};

export default MapsView;
