import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

export async function ListBusiness(req: Request, res: Response) {
  try {
    const business = await Business.find();

    res.json(business);
  } catch (error) {
    res.sendStatus(500);
  }
}
