import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({
	port: parseInt(process.env.PORT ?? '8080'),
});

export default wsServer;
