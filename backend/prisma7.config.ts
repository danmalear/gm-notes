import { defineConfig, env } from '@prisma/prisma7/config';
import 'dotenv/config';

export default defineConfig({
	schema: 'prisma/',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: env('DATABASE_URL'),
	},
});
