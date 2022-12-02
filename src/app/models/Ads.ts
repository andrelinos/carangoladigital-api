import { model, Schema } from 'mongoose';

const ads = new Schema(
  {
    tile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELED', 'PENDING', 'INACTIVE', 'PAUSED'],
      default: 'PENDING',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    canceledAt: {
      type: Date,
    },
    ads: {
      type: [
        {
          ad: {
            type: {
              title: {
                type: String,
                required: true,
              },
              images: {
                banners: {
                  type: ['Mixed'],
                },
              },
              description: {
                type: String,
              },
            },
          },
        },
      ],
    },
  },
  {
    collection: 'ads',
  },
);

export const Ads = model('Ads', ads);
