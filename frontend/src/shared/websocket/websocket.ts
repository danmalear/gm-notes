const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const port = import.meta.env.VITE_WS_PORT;

const ws = new WebSocket(`${baseUrl}:${port}`);

ws.addEventListener('open', () => {
	console.log(`WebSocket connection opened`);
});

ws.addEventListener('error', (e) => {
	console.error(`WEBSOCKET ERROR: ${e}`);
});

export default ws;
