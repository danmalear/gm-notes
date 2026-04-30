import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({
	port: parseInt(process.env.WS_PORT ?? '8081'),
});

export default wsServer;
