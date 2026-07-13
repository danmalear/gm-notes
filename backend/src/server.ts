import {
	AbilityCheckRepository,
	type IAbilityCheckRepository,
} from '#ability-check/ability-check-repository.ts';
import { abilityCheckRoutes } from '#ability-check/ability-check-routes.ts';
import {
	ActionRepository,
	type IActionRepository,
} from '#action/action-repository.ts';
import { actionRoutes } from '#action/action-routes.ts';
import { CampaignCommandHandler } from '#campaign/campaign-commands.ts';
import { CampaignProjections } from '#campaign/campaign-projections.ts';
import {
	CampaignRepository,
	type ICampaignRepository,
} from '#campaign/campaign-repository.ts';
import { CampaignRouter } from '#campaign/campaign-router.ts';
import type { ICommandBus } from '#command/command-bus.ts';
import { CommandBus } from '#command/command-bus.ts';
import {
	CommandRepository,
	type ICommandRepository,
} from '#command/command-repository.ts';
import { commandRoutes } from '#command/command-routes.ts';
import {
	ConditionRepository,
	type IConditionRepository,
} from '#condition/condition-repository.ts';
import type { IEventBus } from '#event/event-bus.ts';
import { EventBus } from '#event/event-bus.ts';
import { EventCommandHandler } from '#event/event-commands.ts';
import {
	EventRepository,
	type IEventRepository,
} from '#event/event-repository.ts';
import { FileRepository, type IFileRepository } from '#file/file-repository.ts';
import { fileRoutes } from '#file/file-routes.ts';
import createWsServer from '#framework/websocket.ts';
import {
	HandoutRepository,
	type IHandoutRepository,
} from '#handout/handout-repository.ts';
import { ItemRepository, type IItemRepository } from '#item/item-repository.ts';
import { itemRoutes } from '#item/item-routes.ts';
import {
	LocationItemRepository,
	type ILocationItemRepository,
} from '#item/location-item-repository.ts';
import { MapRepository, type IMapRepository } from '#map/map-repository.ts';
import { mapRoutes } from '#map/map-routes.ts';
import {
	NarrationRepository,
	type INarrationRepository,
} from '#narration/narration-repository.ts';
import { narrationRoutes } from '#narration/narration-routes.ts';
import { NoteRepository, type INoteRepository } from '#note/note-repository.ts';
import { PrismaClient } from '#prisma-client';
import {
	RegionRepository,
	type IRegionRepository,
} from '#region/region-repository.ts';
import { regionRoutes } from '#region/region-routes.ts';
import {
	RegionShapeRepository,
	type IRegionShapeRepository,
} from '#region/region-shape-repository.ts';
import type { MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import type { BaseRouterOpts, BaseStreamRouterOpts } from '#shared/router.ts';
import {
	StreamRepository,
	type IStreamRepository,
} from '#stream/stream-repository.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';
import 'dotenv/config';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { createServer } from 'http';
import path from 'path';

interface Repositories {
	command: ICommandRepository;
	event: IEventRepository;
	stream: IStreamRepository;
	file: IFileRepository;
	note: INoteRepository;
	narration: INarrationRepository;
	handout: IHandoutRepository;
	abilityCheck: IAbilityCheckRepository;
	condition: IConditionRepository;
	action: IActionRepository;
	item: IItemRepository;
	locationItem: ILocationItemRepository;
	regionShape: IRegionShapeRepository;
	region: IRegionRepository;
	map: IMapRepository;
	campaign: ICampaignRepository;
}

function initRepos(prisma: PrismaClient): Repositories {
	const command = new CommandRepository({ prisma });
	const event = new EventRepository({ prisma });
	const stream = new StreamRepository({ prisma });

	const file = new FileRepository({ prisma });
	const note = new NoteRepository({ prisma });
	const narration = new NarrationRepository({ prisma });
	const handout = new HandoutRepository({ prisma });
	const abilityCheck = new AbilityCheckRepository({ prisma });
	const condition = new ConditionRepository({ prisma });
	const action = new ActionRepository({ prisma });
	const item = new ItemRepository({ prisma });
	const locationItem = new LocationItemRepository({ prisma });
	const regionShape = new RegionShapeRepository({ prisma });
	const region = new RegionRepository({ prisma });
	const map = new MapRepository({ prisma });
	const campaign = new CampaignRepository({ prisma });

	return {
		command,
		event,
		stream,
		file,
		note,
		narration,
		handout,
		abilityCheck,
		condition,
		action,
		item,
		locationItem,
		regionShape,
		region,
		map,
		campaign,
	};
}

interface InitCommandHandlersOpts {
	repositories: Repositories;
	eventBus: IEventBus;
	commandBus: ICommandBus;
}

interface CommandHandlers {
	event: EventCommandHandler;
	campaign: CampaignCommandHandler;
}

function initCommandHandlers({
	repositories,
	eventBus,
	commandBus,
}: InitCommandHandlersOpts): CommandHandlers {
	// Initialize
	const event = new EventCommandHandler({
		eventBus,
		eventRepository: repositories.event,
		streamRepository: repositories.stream,
	});

	const campaign = new CampaignCommandHandler({
		eventBus,
		eventRepository: repositories.event,
		streamRepository: repositories.stream,
		campaignRepository: repositories.campaign,
	});

	// Subscribe
	commandBus.subscribe('Event', event);
	commandBus.subscribe('Campaign', campaign);

	// Return
	return {
		event,
		campaign,
	};
}

interface InitEventSubscribersOpts {
	repositories: Repositories;
	eventBus: IEventBus;
}

interface Projections {
	campaign: CampaignProjections;
}

interface EventSubscribers {
	projections: Projections;
}

function initEventSubscribers({
	repositories,
	eventBus,
}: InitEventSubscribersOpts): EventSubscribers {
	// Initialize
	const campaignProjections = new CampaignProjections(repositories.campaign);

	// Subscribe
	eventBus.subscribe('Campaign', campaignProjections);

	// Return
	return {
		projections: {
			campaign: campaignProjections,
		},
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

	const uploadsPath = path.resolve('uploads');

	const repositories = initRepos(prisma);

	const commandBus = new CommandBus({
		commandRepository: repositories.command,
	});
	const eventBus = new EventBus({
		eventRepository: repositories.event,
		streamRepository: repositories.stream,
		wss: wsServer,
	});

	initEventSubscribers({ repositories, eventBus });

	initCommandHandlers({
		repositories,
		eventBus,
		commandBus,
	});

	const baseRouterOpts: BaseRouterOpts = {
		app,
	};

	const baseStreamRouterOpts: Omit<BaseStreamRouterOpts, 'repository'> = {
		...baseRouterOpts,
		commandBus,
		eventBus,
		eventRepository: repositories.event,
		streamRepository: repositories.stream,
	};

	commandRoutes({ app, commandBus });

	const campaignRouter = new CampaignRouter({
		...baseStreamRouterOpts,
		repository: repositories.campaign,
	});

	campaignRouter.init();

	mapRoutes({ app, commandBus, eventBus, mapRepository: repositories.map });
	regionRoutes({
		app,
		commandBus,
		eventBus,
		regionRepository: repositories.region,
		regionShapeRepository: repositories.regionShape,
	});
	abilityCheckRoutes({
		app,
		commandBus,
		eventBus,
		abilityCheckRepository: repositories.abilityCheck,
	});
	narrationRoutes({
		app,
		commandBus,
		eventBus,
		narrationRepository: repositories.narration,
	});
	actionRoutes({
		app,
		commandBus,
		eventBus,
		actionRepository: repositories.action,
	});
	itemRoutes({
		app,
		commandBus,
		eventBus,
		itemRepository: repositories.item,
		locationItemRepository: repositories.locationItem,
	});
	fileRoutes({ app, fileRepository: repositories.file, uploadsPath });

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
