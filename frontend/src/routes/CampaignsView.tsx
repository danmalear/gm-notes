import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router';
import CampaignCard from '../components/CampaignCard';
import classes from './CampaignsView.module.css';

const data = [
	{
		image: '/src/assets/death-house.jpg',
		name: 'Curse of Strahd',
	},
];

export default function CampaignsView() {
	const navigate = useNavigate();

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

	const slides = data.map((item) => (
		<Carousel.Slide key={item.name}>
			<CampaignCard
				imageUrl={item.image}
				name={item.name}
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
