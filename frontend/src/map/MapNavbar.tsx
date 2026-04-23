import { CampaignContext } from '#campaign/CampaignContext.ts';
import type { Lighting } from '#shared/data-types.ts';
import { AppShell, Box, NavLink, Select, Title } from '@mantine/core';
import { useContext } from 'react';
import { Link } from 'react-router';
import type { TimeOfDay } from '../legacy/MapData.ts';

// HC = hard-coded, to be deleted when data is properly loaded

export interface MapNavbarProps {
	defaultLighting: Lighting;
	onDefaultLightingChanged: (value: Lighting) => void;
	defaultLightingLoading: boolean;
	// @TODO remove this dependency
	timeOfDayHC: TimeOfDay;
	onTimeOfDayChangedHC: (newValue: TimeOfDay) => void;
	// @TODO remove this dependency
	currentMapHC: string;
	onCurrentMapChangedHC: (newValue: string) => void;
}

const MapNavbar: React.FC<MapNavbarProps> = ({
	defaultLighting,
	onDefaultLightingChanged,
	defaultLightingLoading: lightingLoading,
	// @TODO remove this dependency
	timeOfDayHC,
	onTimeOfDayChangedHC,
	// @TODO remove this dependency
	currentMapHC,
	onCurrentMapChangedHC,
}) => {
	const campaign = useContext(CampaignContext);

	const lightingOptions: Lighting[] = ['Bright Light', 'Dim Light', 'Darkness'];

	const isLighting = (value: string): value is Lighting => {
		return (lightingOptions as string[]).includes(value);
	};

	const handleLightingChange = (value: string | null) => {
		if (value && isLighting(value)) {
			onDefaultLightingChanged(value);
		} else {
			console.error('Invalid lighting value selected');
			onDefaultLightingChanged('Bright Light');
		}
	};

	return (
		<AppShell.Navbar>
			<Box h="100%" w="100%">
				<Link to={`/campaign/${campaign.id}/map`}>
					<NavLink label="Change Map" component="div" />
				</Link>
				<Title order={3}>Legacy Settings</Title>
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
				<Title order={3}>Features</Title>
				<Select
					label="Default Lighting"
					data={lightingOptions}
					value={defaultLighting}
					allowDeselect={false}
					disabled={lightingLoading}
					onChange={handleLightingChange}
				/>
			</Box>
		</AppShell.Navbar>
	);
};

export default MapNavbar;
