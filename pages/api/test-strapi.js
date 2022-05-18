import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.getCompanyBySlug({
    slug: 'lifted-ventures-ltd',
  });
  res.status(200).json({ data });
}
