import { Breadcrumbs } from '@mantine/core';
import {
	href,
	NavLink,
	useLocation,
	useMatches,
	useParams,
} from 'react-router';

const AppBreadcrumbs: React.FC = () => {
	const params = useParams();
	const path = useLocation().pathname;
	const matches = useMatches();
	const navLinks: React.ReactNode[] = [];

	type CampaignData = { campaign: { name: string } };
	function validateCampaignRoute(
		campaignData: unknown,
	): asserts campaignData is CampaignData {
		if (
			!campaignData ||
			typeof campaignData !== 'object' ||
			!('campaign' in campaignData) ||
			!campaignData.campaign ||
			typeof campaignData.campaign !== 'object' ||
			!('name' in campaignData.campaign) ||
			!campaignData.campaign.name ||
			typeof campaignData.campaign.name !== 'string'
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
			const campaignData = campaignMatch?.loaderData;
			validateCampaignRoute(campaignData);
			const campaignName = campaignData.campaign.name;
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

	type MapData = { map: { name: string } };
	function validateMapRoute(mapData: unknown): asserts mapData is MapData {
		if (
			!mapData ||
			typeof mapData !== 'object' ||
			!('map' in mapData) ||
			!mapData.map ||
			typeof mapData.map !== 'object' ||
			!('name' in mapData.map) ||
			!mapData.map.name ||
			typeof mapData.map.name !== 'string'
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
			const mapData = mapMatch?.loaderData;
			validateMapRoute(mapData);
			const mapName = mapData.map.name;
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

	return <Breadcrumbs separator="/">{navLinks}</Breadcrumbs>;
};

export default AppBreadcrumbs;
