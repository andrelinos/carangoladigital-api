import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

export async function DeleteBusiness(req: Request, res: Response) {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({
        error: 'Business invalid or missing',
      });
    }

    await Business.findByIdAndDelete(businessId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
