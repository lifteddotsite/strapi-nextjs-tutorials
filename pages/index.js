import datasource from '../datalayer';
import JobsPage from '../components/ui/JobsPage';

export default function Index({ jobs, jobSkills }) {
  return <JobsPage jobs={jobs} jobSkills={jobSkills} />;
}

export const getStaticProps = async (ctx) => {
  const jobs = await datasource.getJobs();
  const jobSkills = await datasource.getJobsSkills();

  return {
    props: {
      jobs,
      jobSkills,
    },
    revalidate: 5,
  };
};
