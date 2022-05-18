import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.getJobsSlugs();
  res.status(200).json({ data });
}
