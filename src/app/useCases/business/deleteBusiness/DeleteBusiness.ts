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
    const businessExists = Business.find({
      _id: businessId,
    });

    if ((await businessExists).length < 1) {
      return res.status(404).json({
        error: 'Business does not exist',
      });
    }

    await Business.findByIdAndDelete(businessId);

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}
