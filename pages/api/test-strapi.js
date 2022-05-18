import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.getJobsSkills();
  res.status(200).json({ data });
}
