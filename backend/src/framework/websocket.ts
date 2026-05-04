import type { Server } from 'http';
import { WebSocketServer } from 'ws';

export default function createWsServer(server: Server) {
	const wsServer = new WebSocketServer({
		server,
		path: '/ws',
	});

	console.log(
		`Websocket server listening at path ${JSON.stringify(wsServer.options.path)}`,
	);

	wsServer.on('connection', (socket) => {
		console.log(`Websocket client connected`);

		socket.on('close', () => {
			console.log('Websocket client disconnected');
		});
	});

	wsServer.on('event', (event, data) => {
		wsServer.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(`${event}/${JSON.stringify(data)}`);
			}
		});
	});

	return wsServer;
}
