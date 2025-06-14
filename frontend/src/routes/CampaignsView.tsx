import type {
	CampaignResponse as Campaign,
	CampaignCreate,
} from '#dtos/Campaign.ts';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon, Box, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import type { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CampaignCard from '../components/CampaignCard.tsx';
import CreateCampaignModal from '../components/CreateCampaignModal.tsx';
import { getMessage } from '../helpers/error.ts';
import {
	getAllCampaigns,
	insertCampaign,
} from '../services/campaignService.ts';
import classes from './CampaignsView.module.css';

const CampaignsView: React.FC = () => {
	const navigate = useNavigate();

	const [campaigns, setCampaigns] = useState<Campaign[]>([]);

	useEffect(() => {
		getAllCampaigns()
			.then((response) => {
				setCampaigns(response.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(`Error fetching campaigns: ${getMessage(e)}`);
			});
	}, []);

	const handleOpenCampaignClicked = (campaignId: UUID) => {
		const selectedCampaign = campaigns.find((c) => c.id === campaignId);

		if (!selectedCampaign) {
			throw Error('Selected campaign does not exist');
		}

		let destination = `${campaignId}/map`;
		if (selectedCampaign.activeMapId) {
			destination += `/${selectedCampaign.activeMapId}`;
		}
		navigate(destination);
	};

	// #region Create campaign stuff
	const [
		createCampaignOpened,
		{ open: openCreateCampaign, close: closeCreateCampaign },
	] = useDisclosure(false);

	const handleAddCampaignClicked: React.MouseEventHandler<HTMLButtonElement> = (
		e,
	) => {
		e.preventDefault();
		openCreateCampaign();
	};

	const handleCampaignCreated = async (campaign: CampaignCreate) => {
		try {
			const response = await insertCampaign(campaign);
			const newCampaign = response.data.data;
			navigate(`${newCampaign.id}/map`);
		} catch (e) {
			console.error(e);
			alert(`Error creating campaign: ${getMessage(e)}`);
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
	const slides = campaigns.map((campaign) => (
		<Carousel.Slide key={campaign.id}>
			<CampaignCard
				campaign={campaign}
				onOpenCampaignClicked={handleOpenCampaignClicked}
			/>
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
				onClick={handleAddCampaignClicked}
			>
				<IconPlus />
			</ActionIcon>
		</Carousel.Slide>
	);
	// #endregion Slides

	return (
		<>
			<CreateCampaignModal
				opened={createCampaignOpened}
				onClose={closeCreateCampaign}
				onCreate={handleCampaignCreated}
			/>
			<Flex
				h="100vh"
				w="100vw"
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
		</>
	);
};

export default CampaignsView;
