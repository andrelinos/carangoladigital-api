import { Request, Response } from 'express';

import { Business } from '../../../models/Business';

type MediaProps = {
  filename: string;
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

    const businessFound = await Business.findById(businessId);

    if (!businessFound) {
      return res.status(404).json({
        error: 'Business does not found',
      });
    }

    const {
      name,
      categories,
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

    const business = {
      categories: categories
        ? JSON.parse(categories)
        : businessFound.categories,
      name: name ? name : businessFound.name,
      description: description ? description : businessFound.description,
      images: (logo || banner) && {
        logo: logo ? logo[0].filename : businessFound.images?.logo,
        banner: banner ? banner[0]?.filename : businessFound.images?.logo,
      },
      contacts: (phones || socialNetworks || whatsapps) && {
        phones: phones ? JSON.parse(phones) : businessFound.contacts?.phones,
        socialNetworks: socialNetworks
          ? JSON.parse(socialNetworks)
          : businessFound.contacts?.socialNetworks,
        whatsapps: whatsapps
          ? JSON.parse(whatsapps)
          : businessFound.contacts?.whatsapps,
      },
      addresses: addresses ? JSON.parse(addresses) : businessFound.addresses,
      weekdays: weekdays ? JSON.parse(weekdays) : businessFound.weekdays,

      paymentMethods: paymentMethods
        ? JSON.parse(paymentMethods)
        : businessFound.paymentMethods,
      rating: rating ? rating : businessFound.rating,
      tags: tags ? JSON.parse(tags) : businessFound.tags,
      delivery: delivery ? delivery : businessFound.delivery,
    };

    await Business.findByIdAndUpdate(businessId, business);

    return res.json(business);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
