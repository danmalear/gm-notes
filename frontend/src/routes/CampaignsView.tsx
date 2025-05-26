import type { CampaignResponse as Campaign } from '#dtos/Campaign.ts';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CampaignCard from '../components/CampaignCard.tsx';
import { getAllCampaigns } from '../services/campaignService.ts';
import classes from './CampaignsView.module.css';

export default function CampaignsView() {
	const navigate = useNavigate();

	const [campaigns, setCampaigns] = useState<Campaign[]>([]);

	useEffect(() => {
		getAllCampaigns()
			.then((responseData) => {
				console.log('responseData', responseData);
				setCampaigns(responseData);
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);

	const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent,
	) => {
		e.preventDefault();
	};

	const handleAddCampaignClicked: React.MouseEventHandler<HTMLButtonElement> = (
		e,
	) => {
		e.preventDefault();
		alert('Add Campaign clicked');
	};

	const handleOpenCampaignClicked = () => {
		navigate('/map');
	};

	const slides = campaigns.map((campaign) => (
		<Carousel.Slide key={campaign.name}>
			<CampaignCard
				campaign={campaign}
				onOpenCampaignClicked={handleOpenCampaignClicked}
			/>
		</Carousel.Slide>
	));

	const spacer = (
		<Carousel.Slide style={{ flexShrink: 1 }}>
			<div className={classes.spacer} />
		</Carousel.Slide>
	);

	const addNew = (
		<Carousel.Slide>
			<ActionIcon
				id={classes['add-campaign']}
				variant="outline"
				color="gray"
				onClick={handleAddCampaignClicked}
			>
				<IconPlus />
			</ActionIcon>
		</Carousel.Slide>
	);

	return (
		<div id={classes.main} onMouseDown={handleMouseDown}>
			<Carousel
				slideSize="520px"
				slideGap={20}
				withControls={false}
				height="500px"
				emblaOptions={{
					dragFree: true,
				}}
				className={classes.carousel}
			>
				{spacer}
				{slides}
				{addNew}
				{spacer}
			</Carousel>
		</div>
	);
}
