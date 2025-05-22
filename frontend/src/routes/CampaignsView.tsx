import { Carousel } from '@mantine/carousel';

import '@mantine/carousel/styles.css';
import CampaignCard from '../components/CampaignCard';
import './CampaignsView.css';

const data = [
	{
		image: '/src/assets/death-house.jpg',
		title: 'Best forests to visit in North America',
		category: 'nature',
	},
	{
		image: '/src/assets/death-house.jpg',
		title: 'Hawaii beaches review: better than you think',
		category: 'beach',
	},
	{
		image: '/src/assets/death-house.jpg',
		title: 'Mountains at night: 12 best locations to enjoy the view',
		category: 'nature',
	},
	{
		image: '/src/assets/death-house.jpg',
		title: 'Aurora in Norway: when to visit for best experience',
		category: 'nature',
	},
	{
		image: '/src/assets/death-house.jpg',
		title: 'Best places to visit this winter',
		category: 'tourism',
	},
	{
		image: '/src/assets/death-house.jpg',
		title: 'Active volcanos reviews: travel at your own risk',
		category: 'nature',
	},
];

export default function CampaignsView() {
	const slides = data.map((item) => (
		<Carousel.Slide key={item.title}>
			<CampaignCard imageUrl={item.image} />
		</Carousel.Slide>
	));

	const spacer = (
		<Carousel.Slide styles={{ slide: { flexShrink: 1 } }}>
			<div
				style={{
					width: '25px',
				}}
			></div>
		</Carousel.Slide>
	);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
	};

	return (
		<div id="main">
			<Carousel
				slideSize="470px"
				slideGap={20}
				withControls={false}
				height="450px"
				emblaOptions={{
					dragFree: true,
				}}
				className="carousel"
				onMouseDown={handleMouseDown}
			>
				{spacer}
				{slides}
				{spacer}
			</Carousel>
		</div>
	);
}
