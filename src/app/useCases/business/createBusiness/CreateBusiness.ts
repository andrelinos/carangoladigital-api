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

    console.log(logo);

    const {
      name,
      categories,
      description,
      phones,
      social_networks,
      whatsapps,
      addresses,
      weekdays,
      payment_methods,
      rating,
      tags,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    const business = {
      categories: categories && JSON.parse(categories),
      name,
      description,
      images: {
        logo: logo && logo[0].filename,
        banner: banner && banner[0].filename,
      },
      contacts: {
        phones: phones && JSON.parse(phones),
        social_networks: social_networks && JSON.parse(social_networks),
        whatsapps: whatsapps && JSON.parse(whatsapps),
      },
      addresses: addresses && JSON.parse(addresses),
      weekdays: weekdays && JSON.parse(weekdays),

      payment_methods: payment_methods && JSON.parse(payment_methods),
      rating,
      tags: tags && JSON.parse(tags),
    };

    await Business.create(business);

    res.json(business);
  } catch (error) {
    res.sendStatus(500);
  }
}
