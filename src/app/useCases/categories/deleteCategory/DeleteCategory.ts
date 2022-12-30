import { Request, Response } from 'express';

import { Business } from '../../../models/Business';
import { Category } from '../../../models/Category';

export async function DeleteCategory(req: Request, res: Response) {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({
      error: 'Invalid or missing category',
    });
  }

  try {
    const categoryExists = await Category.findById(categoryId);
    const categoryHasBusiness = await Business.find({
      categories: categoryId,
    });

    if (!categoryExists) {
      res.status(404).json({ message: 'Category does not exist' });
    }

    if (categoryHasBusiness.length > 0) {
      res.status(400).json({ message: 'Category has business' });
    }

    if (categoryExists && categoryHasBusiness.length < 1) {
      await Category.findByIdAndDelete(categoryId).then(() =>
        res.sendStatus(204),
      );
    }
  } catch {
    res.sendStatus(500);
  }
}
