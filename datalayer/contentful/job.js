import { client } from './client';
import { jobReducer, skillsReducer, tagsReducer } from './utils';

export const getJobs = async () => {
  const res = await client.getEntries({ content_type: 'job' });
  const rawJobs = res.items;

  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });
  return jobs;
};

export const getJobsSkills = async () => {
  const res = await client.getTags();
  const rawTags = res.items;

  const tags = tagsReducer(rawTags);
  const skills = skillsReducer(tags);
  return skills;
};

export const getJobsSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: 'job',
    select: ['fields.slug'],
  });
  const slugs = rawSlugs.items.map((rawSlug) => rawSlug.fields.slug);
  return slugs;
};

export const getJobBySlug = async ({ slug }) => {
  const found = await client.getEntries({
    content_type: 'job',
    'fields.slug': slug,

    // needed to fetch linked items, otherwise job.fields.relatedJobs[0].fields.company.fields is undefined
    // https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/links/retrieval-of-linked-items
    include: 2,
  });

  if (found.items.length == 0) return null;
  const job = found.items[0];
  return jobReducer(job);
};

export const getJobsByCompanyId = async ({ id }) => {
  const res = await client.getEntries({
    content_type: 'job',
    'fields.company.sys.id': id,
    include: 2,
  });

  const rawJobs = res.items;
  const jobs = rawJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });
  return jobs;
};

const _searchJobs = async (query) => {
  let contentFullQuery = {
    content_type: 'job',
    include: 2,
  };

  // Add Equality Query Filters
  if (query.remoteOkOnly)
    contentFullQuery['fields.remoteOk'] = query.remoteOkOnly;
  if (query.featuredJobsOnly)
    contentFullQuery['fields.featuredJob'] = query.featuredJobsOnly;

  // Add Range Query Filters
  contentFullQuery['fields.baseAnnualSalary[gte]'] = query.minBaseSalary;
  contentFullQuery['fields.baseAnnualSalary[lte]'] = query.maxBaseSalary;

  // Add Tags Query Filters
  // we first parse the skills tags back to their contentful-specific version with the "skill." prefix
  const selectedTags = query.selectedTags.map((tag) => `skill.${tag}`);
  if (selectedTags.length)
    contentFullQuery['metadata.tags.sys.id[in]'] = selectedTags.join(',');

  // Add Full Text Search Query
  if (query.searchBarText) {
    contentFullQuery['query'] = query.searchBarText;
  }

  // Add Inclusion Query Filters
  // [DOES NOT WORK]
  // contentful api does NOT have an OR operator: https://www.contentfulcommunity.com/t/delivery-api-or-in-search-query/763
  // contentFullQuery['fields.jobType[in]'] = query.jobTypes;
  // contentFullQuery['fields.experienceLevel[in]'] = query.experienceLevels;

  const res = await client.getEntries(contentFullQuery);
  const foundJobs = res.items;

  const jobs = foundJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });

  // Now because contentful doesn't have an OR operator we have to filter at the application level which is not efficient
  let filteredJobs = jobs.filter((job) => {
    if (query.experienceLevels.length == 0) return true;
    if (query.experienceLevels.includes(job.experienceLevel)) return true;
    return false;
  });

  filteredJobs = filteredJobs.filter((job) => {
    if (query.jobTypes.length == 0) return true;
    if (query.jobTypes.includes(job.jobType)) return true;
    return false;
  });

  return filteredJobs;
};

const _searchCompaniesButReturnJobs = async (searchBarText) => {
  let contentFullQuery = {
    content_type: 'job',
    'fields.company.sys.contentType.sys.id': 'company',
    'fields.company.fields.name[match]': searchBarText,

    // multiple matches are NOT supported by Contentful so we prioritise the company name
    // 'fields.company.fields.city[match]': searchBarText,
    // 'fields.company.fields.slogan[match]': searchBarText,
    // 'fields.company.fields.website[match]': searchBarText,
    include: 2,
  };
  const res = await client.getEntries(contentFullQuery);
  const foundJobs = res.items;

  const jobs = foundJobs.map((rawJob) => {
    return jobReducer(rawJob);
  });

  return jobs;
};

export const searchJobs = async (query) => {
   // search in the jobs entities
   const jobs1 = await _searchJobs(query);

   // seatch in the job entities by company name
   let jobs2 = [];
   if (query.searchBarText) {
     jobs2 = await _searchCompaniesButReturnJobs(query.searchBarText);
   }
 
   // merge the two results
   let jobs1Ids = jobs1.map((job) => job.id);
   jobs2.map((job2) => {
     if (!jobs1Ids.includes(job2.id)) {
       jobs1.push(job2);
     }
   });
 
   return jobs1;
};
