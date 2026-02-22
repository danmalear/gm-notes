import type { CampaignResponse } from 'backend/src/dtos/campaign.js';
import { createContext } from 'react';

export const CampaignContext = createContext<CampaignResponse>(null!);
