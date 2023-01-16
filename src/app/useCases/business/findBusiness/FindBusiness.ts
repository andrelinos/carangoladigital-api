import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

export async function FindBusiness(req: Request, res: Response) {
  try {
    const { q } = req.query;

    console.log('Q: ', q);

    if (!q) {
      return res.status(400).json({
        error: 'Terms invalid or missing',
      });
    }

    const businessFound = await Business.find({ name: q }).where({
      name: { $regex: q, $options: 'i' },
    });

    if (!businessFound) {
      return res.status(404).json({
        error: 'Business does not found',
      });
    }

    res.json(businessFound);
  } catch (error) {
    res.sendStatus(500);
  }
}
