import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

export async function GetBusinessInfo(req: Request, res: Response) {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({
        error: 'Business invalid or missing',
      });
    }

    const businessFound = await Business.findById(businessId);

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
