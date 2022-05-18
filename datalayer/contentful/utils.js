import date from 'date-and-time';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export const dateReducer = (dateStr) => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  return dateObj.toDateString();
};

export const richTextReducer = (rawRichtext) => {
  const parsedRichText = documentToHtmlString(rawRichtext);
  let styledRichText = parsedRichText.replace(
    '<ul>',
    "<ul style='list-style-type: circle;'>"
  );
  return styledRichText;
};

export const imageReducer = (imageField) => {
  return {
    url: `https:${imageField.fields.file.url}`,
    alt: imageField.fields.title,
    height: imageField.fields.file.details.image.height,
    width: imageField.fields.file.details.image.width,
    contentType: imageField.fields.file.contentType,
  };
};

export const companyReducer = (rawCompany) => {
  let company = { ...rawCompany.fields };
  company.id = rawCompany.sys.id;
  company.locale = rawCompany.sys.locale;
  company.logo = imageReducer(rawCompany.fields.logo);
  company.coverImage = imageReducer(rawCompany.fields.coverImage);
  return company;
};

export const tagsReducer = (tagsField) => {
  let tags = [];
  tagsField.map((rawTag) => {
    const tag = rawTag.sys.id;
    tags.push(tag);
  });
  return tags;
};

export const skillsReducer = (parsedTags) => {
  const skillTags = parsedTags.filter((tag) => tag.includes('skill.'));
  const skills = skillTags.map((skillTag) => skillTag.replace('skill.', ''));
  return skills;
};

export const jobReducer = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.fields };

  job.id = rawJob.sys.id;
  job.locale = rawJob.sys.locale;
  job.datePosted = dateReducer(rawJob.fields.datePosted);
  job.company = companyReducer(rawJob.fields.company);
  job.aboutYou = richTextReducer(rawJob.fields.aboutYou);
  job.remunerationPackage = richTextReducer(rawJob.fields.remunerationPackage);
  job.jobResponsibilities = richTextReducer(rawJob.fields.jobResponsibilities);
  job.jobDescription = richTextReducer(rawJob.fields.jobDescription);
  job.tags = tagsReducer(rawJob.metadata.tags);
  job.skills = skillsReducer(job.tags);

  const relatedJobs = rawJob.fields.relatedJobs || [];

  if (!parseRelatedJobs) {
    job.relatedJobs = [];
  } else {
    job.relatedJobs = relatedJobs.map((relatedJob) => {
      return jobReducer(relatedJob, false);
    });
  }

  return job;
};
