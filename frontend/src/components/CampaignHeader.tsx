import { AppShell, Breadcrumbs, Center, Grid } from '@mantine/core';
import {
	href,
	NavLink,
	UIMatch,
	useLocation,
	useMatches,
	useParams,
} from 'react-router';

export interface CampaignHeaderProps extends React.PropsWithChildren {
	title: string;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ title }) => {
	const params = useParams();
	const path = useLocation().pathname;
	const matches = useMatches();
	const navLinks: React.ReactNode[] = [];

	type CampaignMatch = UIMatch<{ campaign: { name: string } }, unknown>;
	function validateCampaignRoute(
		campaignMatch: UIMatch<unknown, unknown> | undefined,
	): asserts campaignMatch is CampaignMatch {
		if (
			!campaignMatch ||
			typeof campaignMatch !== 'object' ||
			!('data' in campaignMatch) ||
			!campaignMatch.data ||
			typeof campaignMatch.data !== 'object' ||
			!('campaign' in campaignMatch.data) ||
			!campaignMatch.data.campaign ||
			typeof campaignMatch.data.campaign !== 'object' ||
			!('name' in campaignMatch.data.campaign) ||
			!campaignMatch.data.campaign.name ||
			typeof campaignMatch.data.campaign.name !== 'string'
		) {
			throw Error('Campaign routing malfunctioned - try refreshing');
		}
	}

	const campaignId = params.campaignId;
	const addCampaignLinks = () => {
		navLinks.push(
			<NavLink to="/campaign" end>
				Campaigns
			</NavLink>,
		);
		if (campaignId) {
			const campaignMatch = matches.find((match) =>
				match.pathname.endsWith(campaignId),
			);
			validateCampaignRoute(campaignMatch);
			const campaignName = campaignMatch.data.campaign.name;
			if (path.endsWith(campaignId)) {
				navLinks.push(campaignName);
			} else {
				navLinks.push(
					<NavLink
						to={href('/campaign/:campaignId', {
							campaignId,
						})}
						end
					>
						{campaignName}
					</NavLink>,
				);

				if (path.match(/\/map(\/|$)/)) {
					addMapLinks();
				}
			}
		}
	};

	type MapMatch = UIMatch<{ map: { name: string } }, unknown>;
	function validateMapRoute(
		mapMatch: UIMatch<unknown, unknown> | undefined,
	): asserts mapMatch is MapMatch {
		if (
			!mapMatch ||
			typeof mapMatch !== 'object' ||
			!('data' in mapMatch) ||
			!mapMatch.data ||
			typeof mapMatch.data !== 'object' ||
			!('map' in mapMatch.data) ||
			!mapMatch.data.map ||
			typeof mapMatch.data.map !== 'object' ||
			!('name' in mapMatch.data.map) ||
			!mapMatch.data.map.name ||
			typeof mapMatch.data.map.name !== 'string'
		) {
			throw Error('Map routing malfunctioned - try refreshing');
		}
	}

	const mapId = params.mapId;
	const addMapLinks = () => {
		navLinks.push(
			<NavLink
				to={href('/campaign/:campaignId/map', {
					campaignId,
				})}
				end
			>
				Maps
			</NavLink>,
		);
		if (mapId) {
			const mapMatch = matches.find((match) => match.pathname.endsWith(mapId));
			validateMapRoute(mapMatch);
			const mapName = mapMatch.data.map.name;
			navLinks.push(
				<NavLink
					to={href('/campaign/:campaignId/map/:mapId', {
						campaignId,
						mapId,
					})}
					end
				>
					{mapName}
				</NavLink>,
			);
		}
	};

	if (path.match(/\/campaign(\/|$)/)) {
		addCampaignLinks();
	}

	// Shave off the active page
	navLinks.pop();

	return (
		<AppShell.Header px="sm">
			<Center h="100%" w="100%">
				<Grid w="100%" gutter={0} align="center">
					<Grid.Col span={4}>
						<Breadcrumbs separator="/">{navLinks}</Breadcrumbs>
					</Grid.Col>
					<Grid.Col span={4}>
						<Center>
							<h2>{title}</h2>
						</Center>
					</Grid.Col>
				</Grid>
			</Center>
		</AppShell.Header>
	);
};

export default CampaignHeader;
