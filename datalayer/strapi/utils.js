import date from 'date-and-time';

const assetsBaseUrl = process.env.STRAPI_API_BASE_URL.replace('/api', '');

export const imageReducer = (imageField) => {
  const fields = imageField.data.attributes;
  return {
    url: `${assetsBaseUrl}${fields.url}`,
    alt: `${fields.caption}`,
    height: fields.height,
    width: fields.width,
    contentType: fields.mime,
  };
};

export const companyReducer = (rawCompany) => {
  let company = { ...rawCompany.attributes };
  company.id = rawCompany.id;
  company.logo = imageReducer(company.logo);
  company.coverImage = imageReducer(company.coverImage);
  return company;
};

export const dateReducer = (dateStr) => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  return dateObj.toDateString();
};

export const skillsReducer = (tagsField) => {
  if (!tagsField) return [];
  let tags = [];
  tagsField.data.map((rawTag) => {
    const tag = rawTag.attributes.name;
    tags.push(tag);
  });
  return tags;
};
