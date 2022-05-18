import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.searchJobs({
    experienceLevels: ['Junior', 'Tech-lead'],
  });
  // const data = await datasource.searchJobs({
  //   jobTypes: ['Full-time', 'Internship'],
  // });
  res.status(200).json({ data });
}
