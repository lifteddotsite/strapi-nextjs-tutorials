import axios from './client';
import qs from 'qs';

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getJobsSlugs = async () => {
  const query = qs.stringify(
    {
      fields: ['slug'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawSlugs = res.data.data;
//   return rawSlugs;

  const slugs = rawSlugs.map((rawSlug) => {
    return rawSlug.attributes.slug;
  });
  return slugs;
};
