import { WebSocket } from 'http';

const baseUrl = process.env.VITE_SERVER_BASE_URL;
const port = process.env.VITE_WS_PORT;
if (!baseUrl || !port) {
	throw new Error('Missing required environment variables');
}

const ws = new WebSocket(`${baseUrl}:${port}`);

export default ws;
