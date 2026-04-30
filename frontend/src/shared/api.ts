import axios from 'axios';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const port = import.meta.env.VITE_SERVER_PORT;

if (!baseUrl || !port) {
	throw Error('Server configuration not defined.');
}

const api = axios.create({
	baseURL: `${baseUrl}:${port}`,
});

export default api;
