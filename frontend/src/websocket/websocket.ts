import { getMessage } from '#shared/error.ts';

const maxDepth = 50;

let ws: WebSocket;
let depth = 0;

export function startWebsocket(
	uri: string,
	addEventListeners: (ws: WebSocket) => void,
) {
	ws = new WebSocket(uri);

	ws.addEventListener('open', () => {
		console.log(`WebSocket connection opened at ${uri}`);
		depth = 0;
	});

	ws.addEventListener('close', () => {
		console.log('Websocket connection closed');
		if (depth < maxDepth) {
			depth++;
			console.log(`Attempting to reconnect to server, depth ${depth}`);
			setTimeout(() => startWebsocket(uri, addEventListeners), 2000);
		}
	});

	ws.addEventListener('error', (e) => {
		console.error(`WEBSOCKET ERROR: ${getMessage(e)}`);
	});

	addEventListeners(ws);

	return ws;
}
