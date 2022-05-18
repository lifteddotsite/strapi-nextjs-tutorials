import datasource from '../../datalayer';
import JobDetails from '../../components/data/details/JobDetails';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const JobDetailsPage = ({ job }) => {
  if (!job) return <LoadingSpinner customMessage='Loading job data ...' />;
  return <JobDetails job={job} />;
};
export default JobDetailsPage;

export const getStaticPaths = async () => {
  const slugs = await datasource.getJobsSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const job = await datasource.getJobBySlug({ slug });

  if (!job) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      job,
    },
    revalidate: 5,
  };
};
