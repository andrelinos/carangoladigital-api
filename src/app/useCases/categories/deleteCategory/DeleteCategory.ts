import { Request, Response } from 'express';

import { Category } from '../../../models/Category';

export async function DeleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        error: 'Category invalid or missing',
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
