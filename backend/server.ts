import { campaignRoutes } from '#campaign/campaign-routes.ts';
import { CampaignRepository } from '#campaign/CampaignRepository.ts';
import { commandRoutes } from '#command/command-routes.ts';
import { CommandRouter } from '#command/CommandRouter.ts';
import { mapRoutes } from '#map/map-routes.ts';
import { MapRepository } from '#map/MapRepository.ts';
import { narrationRoutes } from '#narration/narration-routes.ts';
import { NarrationRepository } from '#narration/NarrationRepository.ts';
import { RegionRepository } from '#region/RegionRepository.ts';
import { RegionShapeRepository } from '#region/RegionShapeRepository.ts';
import type { MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import cors from 'cors';
import 'dotenv/config';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { routes } from './src/routes.ts';

function createApp() {
	const app = express();

	app.use(cors());
	app.use(express.json());

	const commandRouter = new CommandRouter();

	commandRoutes(app, commandRouter);

	const narrationRepository = new NarrationRepository();
	const regionShapeRepository = new RegionShapeRepository();
	const regionRepository = new RegionRepository();
	const mapRepository = new MapRepository(
		regionRepository,
		regionShapeRepository,
	);
	const campaignRepository = new CampaignRepository(mapRepository);

	campaignRoutes(app, commandRouter, campaignRepository);
	mapRoutes(app, commandRouter, mapRepository);
	narrationRoutes(app, commandRouter, narrationRepository);

	routes(app);

	app.use((req: Request, res: Response<MessageResponse>) => {
		console.error('Unhandled request received');
		res.status(404).send({ message: `Unknown route: ${req.path}` });
	});

	app.use(
		(
			err: unknown,
			_req: Request,
			res: Response<MessageResponse>,
			_next: NextFunction,
		) => {
			console.error(err instanceof Error ? err.stack : getMessage(err));
			res
				.status(500)
				.send({ message: `Internal server error: ${getMessage(err)}` });
		},
	);

	return app;
}

const app = createApp();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
