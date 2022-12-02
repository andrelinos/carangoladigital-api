import { Request, Response } from 'express';

import { Category } from '../../../models/Category';

export async function EditCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { icon, name, description } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        error: 'Category ID is required',
      });
    }

    const category = await Category.findByIdAndUpdate(categoryId, {
      icon,
      name,
      description,
    });

    res.json(category);
  } catch (error) {
    res.sendStatus(500);
  }
}
