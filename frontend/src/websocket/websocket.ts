import { serverBaseUrl } from '#shared/api.ts';
import { getMessage } from '#shared/error.ts';

const maxDepth = 50;

let ws: WebSocket;
let depth = 0;

function startWebsocket(uri: string) {
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
			setTimeout(() => startWebsocket(uri), 2000);
		}
	});

	ws.addEventListener('error', (e) => {
		console.error(`WEBSOCKET ERROR: ${getMessage(e)}`);
	});

	return ws;
}

ws = startWebsocket(`${serverBaseUrl}/ws`);

export default ws;
