import { abilityCheckRoutes } from '#ability-check/ability-check-routes.ts';
import { AbilityCheckRepository } from '#ability-check/AbilityCheckRepository.ts';
import { actionRoutes } from '#action/action-routes.ts';
import { ActionRepository } from '#action/ActionRepository.ts';
import { campaignRoutes } from '#campaign/campaign-routes.ts';
import { CampaignRepository } from '#campaign/CampaignRepository.ts';
import { commandRoutes } from '#command/command-routes.ts';
import { CommandRepository } from '#command/CommandRepository.ts';
import { ConditionRepository } from '#condition/ConditionRepository.ts';
import { fileRoutes } from '#file/file-routes.ts';
import { FileRepository } from '#file/FileRepository.ts';
import { HandoutRepository } from '#handout/HandoutRepository.ts';
import { itemRoutes } from '#item/item-routes.ts';
import { ItemRepository } from '#item/ItemRepository.ts';
import { LocationItemRepository } from '#item/LocationItemRepository.ts';
import { mapRoutes } from '#map/map-routes.ts';
import { MapRepository } from '#map/MapRepository.ts';
import { MessageBus } from '#message/MessageBus.ts';
import { narrationRoutes } from '#narration/narration-routes.ts';
import { NarrationRepository } from '#narration/NarrationRepository.ts';
import { NoteRepository } from '#note/NoteRepository.ts';
import { regionRoutes } from '#region/region-routes.ts';
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

	const messageBus = new MessageBus();

	commandRoutes(app, messageBus, commandRepository);

	campaignRoutes(app, messageBus, campaignRepository);
	mapRoutes(app, messageBus, mapRepository);
	regionRoutes(app, messageBus, regionRepository, regionShapeRepository);
	abilityCheckRoutes(app, messageBus, abilityCheckRepository);
	narrationRoutes(app, messageBus, narrationRepository);
	actionRoutes(app, messageBus, actionRepository);
	itemRoutes(app, messageBus, itemRepository, locationItemRepository);
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
