import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.getJobs({ start: 0, limit: 2 });
  res.status(200).json({ data });
}
