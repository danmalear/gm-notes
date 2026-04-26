import { AbilityCheckRepository } from '#ability-check/ability-check-repository.ts';
import { abilityCheckRoutes } from '#ability-check/ability-check-routes.ts';
import { ActionRepository } from '#action/action-repository.ts';
import { actionRoutes } from '#action/action-routes.ts';
import { CampaignRepository } from '#campaign/campaign-repository.ts';
import { campaignRoutes } from '#campaign/campaign-routes.ts';
import { CommandRepository } from '#command/command-repository.ts';
import { commandRoutes } from '#command/command-routes.ts';
import { CommandBus } from '#command/CommandBus.ts';
import { ConditionRepository } from '#condition/condition-repository.ts';
import { EventBus } from '#event/EventBus.ts';
import { FileRepository } from '#file/file-repository.ts';
import { fileRoutes } from '#file/file-routes.ts';
import { HandoutRepository } from '#handout/handout-repository.ts';
import { ItemRepository } from '#item/item-repository.ts';
import { itemRoutes } from '#item/item-routes.ts';
import { LocationItemRepository } from '#item/location-item-repository.ts';
import { MapRepository } from '#map/map-repository.ts';
import { mapRoutes } from '#map/map-routes.ts';
import { NarrationRepository } from '#narration/narration-repository.ts';
import { narrationRoutes } from '#narration/narration-routes.ts';
import { NoteRepository } from '#note/note-repository.ts';
import { RegionRepository } from '#region/region-repository.ts';
import { regionRoutes } from '#region/region-routes.ts';
import { RegionShapeRepository } from '#region/region-shape-repository.ts';
import type { MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import cors from 'cors';
import 'dotenv/config';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';

function initRepos() {
	const commandRepository = new CommandRepository();

	const fileRepository = new FileRepository();
	const noteRepository = new NoteRepository();
	const narrationRepository = new NarrationRepository();
	const handoutRepository = new HandoutRepository();
	const abilityCheckRepository = new AbilityCheckRepository(
		narrationRepository,
	);
	const conditionRepository = new ConditionRepository();
	const actionRepository = new ActionRepository(
		abilityCheckRepository,
		conditionRepository,
		narrationRepository,
	);
	const itemRepository = new ItemRepository(
		actionRepository,
		fileRepository,
		noteRepository,
	);
	const locationItemRepository = new LocationItemRepository(
		actionRepository,
		itemRepository,
		noteRepository,
	);
	const regionShapeRepository = new RegionShapeRepository();
	const regionRepository = new RegionRepository(
		actionRepository,
		handoutRepository,
		locationItemRepository,
		narrationRepository,
		noteRepository,
		regionShapeRepository,
	);
	const mapRepository = new MapRepository(
		regionRepository,
		regionShapeRepository,
	);
	const campaignRepository = new CampaignRepository(mapRepository);

	return {
		commandRepository,
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

function createApp() {
	const app = express();

	app.use(cors());
	app.use(express.json());

	const {
		commandRepository,
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
	} = initRepos();

	const commandBus = new CommandBus();
	const eventBus = new EventBus();

	commandRoutes(app, commandBus, commandRepository);

	campaignRoutes(app, commandBus, eventBus, campaignRepository);
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

	return app;
}

const app = createApp();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
