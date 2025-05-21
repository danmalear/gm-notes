import cors from 'cors';
import express from 'express';
import campaignTemplateRoutes from './src/routes/campaignTemplate.ts';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

campaignTemplateRoutes(app, 'campaign-template');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
