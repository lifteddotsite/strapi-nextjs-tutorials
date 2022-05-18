import datasource from '../../datalayer';

export default async function handler(req, res) {
  const companies = await datasource.getCompanies();
  res.status(200).json({ companies });
}
