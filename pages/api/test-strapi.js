import datasource from '../../datalayer';

export default async function handler(req, res) {
  // const data = await datasource.searchJobs({ remoteOkOnly: true });
  const data = await datasource.searchJobs({
    minBaseSalary: 70000,
    maxBaseSalary: 120000,
  });
  res.status(200).json({ data });
}
