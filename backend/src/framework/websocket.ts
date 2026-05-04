import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({
	port: parseInt(process.env.WS_PORT ?? '8081'),
});

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
