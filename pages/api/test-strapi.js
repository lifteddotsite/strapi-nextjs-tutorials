import datasource from '../../datalayer';

export default async function handler(req, res) {
  const data = await datasource.searchJobs({
    selectedTags: ['TailwindCSS', 'ReactJs'],
  });
  res.status(200).json({ data });
}
