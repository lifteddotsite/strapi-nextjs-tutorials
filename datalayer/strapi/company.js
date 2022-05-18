import axios from './client';
import qs from 'qs';


const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getCompanies = async () => {
  const res = await axios.get(`${apiUrl}/companies`);
  const rawCompanies = res.data.data;
  return rawCompanies;
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
