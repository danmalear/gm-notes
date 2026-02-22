import { AppShell, Center, Grid } from '@mantine/core';
import AppBreadcrumbs from './AppBreadcrumbs.tsx';

export interface AppHeaderProps extends React.PropsWithChildren {
	title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
	return (
		<AppShell.Header px="sm">
			<Center h="100%" w="100%">
				<Grid w="100%" gutter={0} align="center">
					<Grid.Col span={4}>
						<AppBreadcrumbs />
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

export default AppHeader;
