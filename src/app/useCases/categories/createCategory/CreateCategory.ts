import { Request, Response } from 'express';

import { Category } from '../../../models/Category';

export async function CreateCategory(req: Request, res: Response) {
  try {
    const { icon, name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    const category = await Category.create({ icon, name, description });

    res.json(category);
  } catch (error) {
    res.sendStatus(500);
  }
}
