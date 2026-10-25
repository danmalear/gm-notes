import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from '../generated/prisma8/contract.d.ts';
import contractJson from '../generated/prisma8/contract.json' with { type: 'json' };

const connectionString = process.env.DATABASE_URL!;

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({ url: connectionString, contract });
