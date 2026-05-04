import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({
	port: parseInt(process.env.WS_PORT ?? '8081'),
});

const wsAddress = wsServer.address();

console.log(
	`Websocket server listening on port ${typeof wsAddress === 'string' ? wsAddress : wsAddress?.port}`,
);

wsServer.on('connection', (socket) => {
	console.log(`Websocket client connected at ${wsServer.path}`);

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

export default wsServer;
