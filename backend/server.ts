import cors from 'cors';
import express from 'express';
import { routes } from './src/routes/routes.ts';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

routes(app);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
