import axios from './client';

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getCompanies = async () => {
  const res = await axios.get(`${apiUrl}/companies`);
  const rawCompanies = res.data.data;
  return rawCompanies;
};
