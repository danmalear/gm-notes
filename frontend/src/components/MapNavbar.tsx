import { AppShell, Box, NavLink, Title } from '@mantine/core';
import { useContext } from 'react';
import { Link } from 'react-router';
import { CampaignContext } from '../contexts/CampaignContext.ts';
import type { TimeOfDay } from '../data/MapData.ts';

// HC = hard-coded, to be deleted when data is properly loaded

export interface MapNavbarProps {
	// @TODO remove this dependency
	timeOfDayHC: TimeOfDay;
	onTimeOfDayChangedHC: (newValue: TimeOfDay) => void;
	// @TODO remove this dependency
	currentMapHC: string;
	onCurrentMapChangedHC: (newValue: string) => void;
}

const MapNavbar: React.FC<MapNavbarProps> = ({
	timeOfDayHC,
	onTimeOfDayChangedHC,
	currentMapHC,
	onCurrentMapChangedHC,
}) => {
	const campaign = useContext(CampaignContext);

	return (
		<AppShell.Navbar>
			<Box h="100%" w="100%">
				<Link to={`/campaign/${campaign.id}/map`}>
					<NavLink label="Change Map" component="div" />
				</Link>
				<select
					className="w-100"
					value={currentMapHC}
					onChange={(e) => onCurrentMapChangedHC(e.target.value)}
				>
					<option value="">--</option>
					<option value="deathHouse">Death House</option>
				</select>
				<select
					className="w-100"
					value={timeOfDayHC}
					onChange={(e) => onTimeOfDayChangedHC(e.target.value as TimeOfDay)}
				>
					<option value="day">Day</option>
					<option value="between">Between</option>
					<option value="night">Night</option>
				</select>
				<Title order={2}>Title</Title>
			</Box>
		</AppShell.Navbar>
	);
};

export default MapNavbar;
