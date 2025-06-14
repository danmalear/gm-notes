import { CampaignResponse } from '#dtos/Campaign.js';
import { createContext } from 'react';

export const CampaignContext = createContext<CampaignResponse>(null!);
