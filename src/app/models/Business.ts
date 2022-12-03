import { model, Schema } from 'mongoose';

const business = new Schema(
  {
    name: {
      type: 'String',
      required: true,
    },
    description: {
      type: 'String',
      required: true,
    },
    images: {
      logo: {
        type: String,
      },
      banner: {
        type: String,
      },
    },
    contacts: {
      phones: {
        type: [
          {
            label: {
              type: String,
            },
            number: {
              type: String,
            },
          },
        ],
      },
      socialNetworks: {
        type: [
          {
            name: {
              type: String,
            },
            url: {
              type: String,
            },
            icon: {
              type: String,
            },
          },
        ],
      },
      whatsapps: {
        type: [
          {
            label: {
              type: String,
            },
            number: {
              type: String,
            },
            icon: {
              type: String,
            },
          },
        ],
      },
    },

    addresses: {
      type: [
        {
          label: {
            type: String,
          },
          address: {
            type: String,
          },
          neighborhood: {
            type: String,
          },
          city: {
            type: String,
          },
          uf: {
            type: String,
          },
          cep: {
            type: String,
          },
          complement: {
            type: String,
          },
          latitude: {
            type: Number,
          },
          longitude: {
            type: Number,
          },
        },
      ],
    },
    weekdays: {
      type: [
        {
          weekday: {
            type: String,
          },
          openingAndClosing: {
            type: [
              {
                opens: {
                  type: String,
                },
                closes: {
                  type: String,
                },
              },
            ],
          },
        },
      ],
    },

    paymentMethods: {
      type: [
        {
          type: String,
          enum: ['MONEY', 'CARD', 'PIX', 'DEPOSIT', 'TRANSFER'],
          default: 'MONEY',
        },
      ],
    },
    delivery: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    categories: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
      ref: 'Category',
    },
    tags: {
      type: [
        {
          type: String,
        },
      ],
    },
    rating: {
      type: Number,
    },
  },
  {
    collection: 'business',
  },
);

export const Business = model('Business', business);
