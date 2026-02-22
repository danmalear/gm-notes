import type { CampaignResponse } from '#dtos/campaign.ts';
import { createContext } from 'react';

export const CampaignContext = createContext<CampaignResponse>(null!);
