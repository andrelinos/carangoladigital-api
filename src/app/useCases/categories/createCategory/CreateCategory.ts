import { Request, Response } from 'express';

import { Category } from '../../../models/Category';

export async function CreateCategory(req: Request, res: Response) {
  const { icon, name, description } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    const categoryFound = await Category.findOne({
      name,
    });

    if (categoryFound) {
      return res.status(400).json({
        error: 'Category name already exist',
      });
    }

    const category = await Category.create({ icon, name, description });

    res.json(category);
  } catch (error) {
    return res.sendStatus(500);
  }
}
