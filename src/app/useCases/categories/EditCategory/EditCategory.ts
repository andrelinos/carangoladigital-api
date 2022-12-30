import { Request, Response } from 'express';

import { Category } from '../../../models/Category';

export async function EditCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  const { icon, name, description } = req.body;

  if (!categoryId) {
    return res.status(400).json({
      error: 'Invalid or missing category',
    });
  }

  try {
    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
      return res.status(404).json({ message: 'Category does not exist' });
    }

    const categoryFound = await Category.findOne({
      name,
    });

    if (categoryFound) {
      return res.status(400).json({
        error: 'Category name already exist',
      });
    }

    await Category.findByIdAndUpdate(categoryId, {
      icon,
      name,
      description,
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}
