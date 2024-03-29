import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

type MediaProps = {
  filename: string;
};

type ImagesProps = {
  logo: MediaProps[];
  banner: MediaProps[];
};

export async function CreateBusiness(req: Request, res: Response) {
  try {
    const { logo, banner } = req.files as unknown as ImagesProps;

    const {
      email,
      name,
      categories,
      slogan,
      description,
      phones,
      socialNetworks,
      whatsapps,
      addresses,
      weekdays,
      paymentMethods,
      rating,
      tags,
      delivery,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    if (!categories) {
      return res.status(400).json({
        error: 'Category is required',
      });
    }

    const emailExists = await Business.findOne({
      email,
    });

    if (emailExists) {
      return res.status(400).json({
        error: 'Email already exist',
      });
    }

    const business = {
      categories: categories && JSON.parse(categories),
      email,
      name,
      slogan,
      description,
      images: {
        logo: logo && logo[0].filename,
        banner: banner && banner[0].filename,
      },
      contacts: {
        phones: phones && JSON.parse(phones),
        socialNetworks: socialNetworks && JSON.parse(socialNetworks),
        whatsapps: whatsapps && JSON.parse(whatsapps),
      },
      addresses: addresses && JSON.parse(addresses),
      weekdays: weekdays && JSON.parse(weekdays),

      paymentMethods: paymentMethods && JSON.parse(paymentMethods),
      rating,
      tags: tags && JSON.parse(tags),
      delivery,
    };

    await Business.create(business);

    res.json(business);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
