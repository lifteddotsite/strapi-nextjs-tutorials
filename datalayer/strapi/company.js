import axios from './client';
import qs from 'qs';

import { companyReducer } from './utils';

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getCompanies = async () => {
  const query = qs.stringify(
    {
      populate: ['logo', 'coverImage'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/companies?${query}`);
  const rawCompanies = res.data.data;
  const companies = rawCompanies.map((company) => companyReducer(company));
  return companies;
};

export const getCompaniesSlugs = async () => {
  const query = qs.stringify(
    {
      fields: ['slug'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/companies?${query}`);
  const rawSlugs = res.data.data;

  const slugs = rawSlugs.map((rawSlug) => {
    return rawSlug.attributes.slug;
  });
  return slugs;
};

export const getCompanyBySlug = async ({ slug }) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['logo', 'coverImage'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/companies?${query}`);
  const rawCompany = res.data.data[0];
  return companyReducer(rawCompany);
};
