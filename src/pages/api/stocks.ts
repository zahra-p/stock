// pages/api/stocks.ts

import { NextApiRequest, NextApiResponse } from 'next';

import { Stock} from "../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stock[] | { error: string }>
) {
  try {
    const response = await fetch('https://brsapi.ir/FreeTsetmcBourseApi/FreeApi.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Stock[] = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
}
