import { model, Schema } from 'mongoose';

const categories = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'categories',
  },
);

export const Category = model('Category', categories);
