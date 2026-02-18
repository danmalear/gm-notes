import type { CampaignResponse } from '#dtos/Campaign.ts';
import { createContext } from 'react';

export const CampaignContext = createContext<CampaignResponse>(null!);
