import { client } from './client';
import { companyReducer } from './utils';

export const getCompanies = async () => {
  const companies = await client.getEntries({ content_type: 'company' });
  console.log(companies);
  return companies.items;
};

export const getCompaniesSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: 'company',
    select: ['fields.slug'],
  });
  const slugs = rawSlugs.items.map((rawSlug) => rawSlug.fields.slug);
  return slugs;
};

export const getCompanyBySlug = async ({ slug }) => {
  const found = await client.getEntries({
    content_type: 'company',
    'fields.slug': slug,
  });

  if (found.items.length == 0) return null;

  const company = found.items[0];
  return companyReducer(company);
};
