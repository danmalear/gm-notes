import { serverBaseUrl } from '#shared/api.ts';

const ws = new WebSocket(`${serverBaseUrl}`);

ws.addEventListener('error', (e) => {
	console.error(`WEBSOCKET ERROR: ${e}`);
});

export default ws;
