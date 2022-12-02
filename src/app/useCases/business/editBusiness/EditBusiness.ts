import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

type MediaProps = {
  path: string;
};

type ImagesProps = {
  logo: MediaProps[];
  banner: MediaProps[];
};

export async function EditBusiness(req: Request, res: Response) {
  try {
    const { businessId } = req.params;
    const { logo, banner } = req.files as unknown as ImagesProps;

    if (!businessId) {
      return res.status(400).json({
        error: 'Business invalid or missing',
      });
    }

    const {
      name,
      category,
      description,
      phones,
      social_networks,
      whatsapps,
      addresses,
      weekdays,
      opening_and_closing,
    } = req.body;

    const business = {
      category: category,
      name,
      description: description,
      images: logo &&
        banner && {
          logo: logo && logo[0].path,
          banner: banner && banner[0].path,
        },

      contacts: (phones || social_networks || whatsapps) && {
        phones: phones && JSON.parse(phones),
        social_networks: social_networks && JSON.parse(social_networks),
        whatsapps: whatsapps && JSON.parse(whatsapps),
      },
      addresses: addresses && JSON.parse(addresses),
      weekdays: weekdays && {
        weekday: weekdays && JSON.parse(weekdays),
      },
      opening_and_closing:
        opening_and_closing && JSON.parse(opening_and_closing),
    };

    await Business.findByIdAndUpdate(businessId, business);

    res.json(business);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
