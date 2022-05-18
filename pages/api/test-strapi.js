import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.getJobBySlug({
    slug: 'junior-software-engineer-next-js-and-reactjs',
  });
  res.status(200).json({ data });
}
