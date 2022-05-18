import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.getJobsByCompanyId({
    id: 2,
  });
  res.status(200).json({ data });
}
