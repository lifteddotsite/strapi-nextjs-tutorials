import datasource from '../../datalayer';

export default async function handler(req, res) {
  // const data = await datasource.searchJobs({ remoteOkOnly: true });
  const data = await datasource.searchJobs({ featuredJobsOnly: true });
  res.status(200).json({ data });
}
