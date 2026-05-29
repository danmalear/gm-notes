import { AbilityCheckRepository } from '#ability-check/ability-check-repository.ts';
import { abilityCheckRoutes } from '#ability-check/ability-check-routes.ts';
import { ActionRepository } from '#action/action-repository.ts';
import { actionRoutes } from '#action/action-routes.ts';
import { CampaignProjections } from '#campaign/campaign-projections.ts';
import { CampaignRepository } from '#campaign/campaign-repository.ts';
import { campaignRoutes } from '#campaign/campaign-routes.ts';
import { CommandRepository } from '#command/command-repository.ts';
import { commandRoutes } from '#command/command-routes.ts';
import { CommandBus } from '#command/CommandBus.ts';
import { ConditionRepository } from '#condition/condition-repository.ts';
import { EventRepository } from '#event/event-repository.ts';
import { EventBus } from '#event/EventBus.ts';
import { FileRepository } from '#file/file-repository.ts';
import { fileRoutes } from '#file/file-routes.ts';
import createWsServer from '#framework/websocket.ts';
import { HandoutRepository } from '#handout/handout-repository.ts';
import { ItemRepository } from '#item/item-repository.ts';
import { itemRoutes } from '#item/item-routes.ts';
import { LocationItemRepository } from '#item/location-item-repository.ts';
import { MapRepository } from '#map/map-repository.ts';
import { mapRoutes } from '#map/map-routes.ts';
import { NarrationRepository } from '#narration/narration-repository.ts';
import { narrationRoutes } from '#narration/narration-routes.ts';
import { NoteRepository } from '#note/note-repository.ts';
import { PrismaClient } from '#prisma-client';
import { RegionRepository } from '#region/region-repository.ts';
import { regionRoutes } from '#region/region-routes.ts';
import { RegionShapeRepository } from '#region/region-shape-repository.ts';
import type { MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { StreamRepository } from '#stream/stream-repository.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';
import 'dotenv/config';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { createServer } from 'http';

function initRepos(prisma: PrismaClient) {
	const commandRepository = new CommandRepository({ prisma });
	const eventRepository = new EventRepository();
	const streamRepository = new StreamRepository();

	const fileRepository = new FileRepository();
	const noteRepository = new NoteRepository();
	const narrationRepository = new NarrationRepository();
	const handoutRepository = new HandoutRepository();
	const abilityCheckRepository = new AbilityCheckRepository({
		narrationRepository,
	});
	const conditionRepository = new ConditionRepository();
	const actionRepository = new ActionRepository({
		abilityCheckRepository,
		conditionRepository,
		narrationRepository,
	});
	const itemRepository = new ItemRepository({
		actionRepository,
		fileRepository,
		noteRepository,
	});
	const locationItemRepository = new LocationItemRepository({
		actionRepository,
		itemRepository,
		noteRepository,
	});
	const regionShapeRepository = new RegionShapeRepository();
	const regionRepository = new RegionRepository({
		actionRepository,
		handoutRepository,
		locationItemRepository,
		narrationRepository,
		noteRepository,
		regionShapeRepository,
	});
	const mapRepository = new MapRepository({
		regionRepository,
		regionShapeRepository,
	});
	const campaignRepository = new CampaignRepository({ mapRepository });

	return {
		commandRepository,
		eventRepository,
		streamRepository,
		fileRepository,
		noteRepository,
		narrationRepository,
		handoutRepository,
		abilityCheckRepository,
		conditionRepository,
		actionRepository,
		itemRepository,
		locationItemRepository,
		regionShapeRepository,
		regionRepository,
		mapRepository,
		campaignRepository,
	};
}

function createAppServer() {
	const app = express();

	app.use(cors());
	app.use(express.json());

	const server = createServer(app);

	const wsServer = createWsServer(server);

	const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
	const prisma = new PrismaClient({ adapter });

	const {
		commandRepository,
		eventRepository,
		streamRepository,
		fileRepository,
		narrationRepository,
		abilityCheckRepository,
		actionRepository,
		itemRepository,
		locationItemRepository,
		regionShapeRepository,
		regionRepository,
		mapRepository,
		campaignRepository,
	} = initRepos(prisma);

	const commandBus = new CommandBus(commandRepository);
	const eventBus = new EventBus({
		eventRepository,
		streamRepository,
		wss: wsServer,
	});

	const campaignProjections = new CampaignProjections(campaignRepository);

	eventBus.subscribe('Campaign', campaignProjections);

	commandRoutes(app, commandBus);

	campaignRoutes(
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		campaignRepository,
	);
	mapRoutes(app, commandBus, eventBus, mapRepository);
	regionRoutes(
		app,
		commandBus,
		eventBus,
		regionRepository,
		regionShapeRepository,
	);
	abilityCheckRoutes(app, commandBus, eventBus, abilityCheckRepository);
	narrationRoutes(app, commandBus, eventBus, narrationRepository);
	actionRoutes(app, commandBus, eventBus, actionRepository);
	itemRoutes(app, commandBus, eventBus, itemRepository, locationItemRepository);
	fileRoutes(app, fileRepository);

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

	return server;
}

const server = createAppServer();
const port = process.env.PORT ?? '3000';

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
