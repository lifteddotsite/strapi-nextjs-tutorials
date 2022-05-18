/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import JobsList from '../data/lists/JobsList';
import SearchJobForm from '../forms/SearchJobForm';
import JobsPageSideBarForm from '../forms/JobsPageSideBarForm';
import JobsSortForm from '../forms/JobsSortForm';

export default function JobsPage({ jobs, jobSkills }) {
  const [displayedJobs, setDisplayedJobs] = useState(jobs);

  const [sideBarFormState, setSideBarFormState] = useState({
    jobTypes: [],
    experienceLevels: [],
    remoteOkOnly: false,
    featuredJobsOnly: false,
    baseSalaryOptions: [],
    baseSalaryBounds: [],
    selectedTags: [],
  });

  const [searchFormState, setSearchFormState] = useState('');

  const searchJobs = async (apiUrl, formsStates) => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formsStates),
    });
    const foundJobs = await response.json();
    console.log(foundJobs);
    setDisplayedJobs(foundJobs);
  };

  const initialRender1 = useRef(true);
  // trigger a search whenever the sidebar form state  changes
  useEffect(() => {
    if (initialRender1.current) {
      initialRender1.current = false;
    } else {
      console.log('sidebar state form changed => triggering a search');
      const formsStates = { searchFormState, sideBarFormState };
      searchJobs('api/search-jobs', formsStates);
    }
  }, [sideBarFormState]);

  const initialRender2 = useRef(true);
  // trigger a search whenever the search form state changes && length >= 3 -OR- length == 0 (implying a reset)
  useEffect(() => {
    if (initialRender2.current) {
      initialRender2.current = false;
    } else {
      console.log('search form changed && length >= 3 OR ==0 => triggering a search');
      if (searchFormState.length >= 3 || searchFormState.length == 0) {
        const formsStates = { searchFormState, sideBarFormState };
        searchJobs('api/search-jobs', formsStates);
      }
    }
  }, [searchFormState]);

  let jobsFoundMessage = `Found ${displayedJobs.length} Jobs`;
  switch (displayedJobs.length) {
    case 0: {
      jobsFoundMessage = 'No Jobs found.';
      break;
    }
    case 1: {
      jobsFoundMessage = 'Only one Job found.';
      break;
    }

    default:
      break;
  }

  const handleSkillTagDelete = (e, skillTag) => {
    e.preventDefault();
    setSideBarFormState((prevState) => {
      return {
        ...prevState,
        selectedTags: prevState.selectedTags.filter((tag) => skillTag != tag),
      };
    });
  };

  return (
    <div className='flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9'>
      <JobsPageSideBarForm
        jobSkills={jobSkills}
        sideBarFormState={sideBarFormState}
        setSideBarFormState={setSideBarFormState}
        setdisplayedJobs={setDisplayedJobs}
      />
      <div className='w-full'>
        <SearchJobForm
          searchFormState={searchFormState}
          setSearchFormState={setSearchFormState}
          setdisplayedJobs={setDisplayedJobs}
        />
        {/* Jobs header */}
        <div className='flex justify-between items-center mb-4'>
          {/* Number of jobs found message  */}
          <div className='text-sm text-slate-500 italic'>
            {jobsFoundMessage}
          </div>

          {/* skills tags */}
          <div>
            <div className='flex flex-wrap items-center -m-1 max-w-2xl'>
              {sideBarFormState.selectedTags &&
                sideBarFormState.selectedTags.map((skill) => (
                  <div className='m-1' key={skill}>
                    <a
                      className='text-xs hover:scale-110  hover:bg-red-100 hover:text-red-600 inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1'
                      href='#'
                    >
                      {skill}
                      <svg
                        className='h-2 w-2 ml-2 mt-1 text-sm hover:cursor-pointer'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 8 8'
                        onClick={(e) => handleSkillTagDelete(e, skill)}
                      >
                        <path
                          strokeLinecap='round'
                          strokeWidth='1.5'
                          d='M1 1l6 6m0-6L1 7'
                        />
                      </svg>
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* Sort */}
          <JobsSortForm
            jobs={displayedJobs}
            setDisplayedJobs={setDisplayedJobs}
          />
        </div>
        <JobsList jobs={displayedJobs} />
      </div>
    </div>
  );
}
