import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

export async function ListBusinessByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const businesses = await Business.find()
      .where('category')
      .equals(categoryId);

    res.json(businesses);
  } catch (error) {
    res.sendStatus(500);
  }
}
