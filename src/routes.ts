import { Router } from 'express';

import { CreateBusiness } from './app/useCases/business/createBusiness/CreateBusiness';
import { DeleteBusiness } from './app/useCases/business/deleteBusiness/DeleteBusiness';
import { EditBusiness } from './app/useCases/business/editBusiness/EditBusiness';
import { FindBusiness } from './app/useCases/business/findBusiness/FindBusiness';
import { GetBusinessInfo } from './app/useCases/business/getBusinessInfo/GetBusinessInfo';
import { ListBusiness } from './app/useCases/business/listBusiness/ListBusiness';
import { EditCategory } from './app/useCases/categories/EditCategory/EditCategory';
import { CreateCategory } from './app/useCases/categories/createCategory/CreateCategory';
import { DeleteCategory } from './app/useCases/categories/deleteCategory/DeleteCategory';
import { ListBusinessByCategory } from './app/useCases/categories/listBusinessByCategory/ListBusinessByCategory';
import { ListCategories } from './app/useCases/categories/listCategory/ListCategory';
import { upload } from './utils/upload';

export const router = Router();

// CATEGORIES
router.post('/categories', CreateCategory);
router.put('/categories/:categoryId', EditCategory);

router.delete('/categories/:categoryId', DeleteCategory);

router.get('/categories', ListCategories);
router.get('/categories/:categoryId/business', ListBusinessByCategory);

// BUSINESS
router.post(
  '/business',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  CreateBusiness,
);

router.put(
  '/business/:businessId',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  EditBusiness,
);

router.get('/business', ListBusiness);
router.get('/business/search', FindBusiness);

router.get('/business/:businessId', GetBusinessInfo);
router.patch('/business/:businessId', EditBusiness);

router.delete('/business/:businessId', DeleteBusiness);
