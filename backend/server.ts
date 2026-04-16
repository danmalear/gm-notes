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

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
