import { useState } from 'react';
import {
  sortJobsByDatePosted,
  sortJobsByBaseAnnualSalary,
  sortJobsByCompanyName,
} from '../../datalayer/utils';

const JobsSortForm = ({ jobs, setDisplayedJobs }) => {
  const [sortby, setSortby] = useState('date-posted');

  const handleChange = (e) => {
    e.preventDefault();
    const newSortby = e.target.value;
    if (newSortby === 'date-posted-asc') {
      const sortedJobs = sortJobsByDatePosted({ jobs, ASC: true });
      setDisplayedJobs(sortedJobs);
    }
    if (newSortby === 'date-posted-desc') {
      const sortedJobs = sortJobsByDatePosted({ jobs, ASC: false });
      setDisplayedJobs(sortedJobs);
    }
    if (newSortby === 'salary-asc') {
      const sortedJobs = sortJobsByBaseAnnualSalary({ jobs, ASC: true });
      setDisplayedJobs(sortedJobs);
    }
    if (newSortby === 'salary-desc') {
      const sortedJobs = sortJobsByBaseAnnualSalary({ jobs, ASC: false });
      setDisplayedJobs(sortedJobs);
    }
    if (newSortby === 'company') {
      const sortedJobs = sortJobsByCompanyName({ jobs });
      setDisplayedJobs(sortedJobs);
    }
    setSortby(newSortby);

    //TODO: create a function to sort the jobs based on the new selected value
  };

  const options = [
    { value: 'company', display: 'Company' },
    { value: 'date-posted-asc', display: 'Date Posted ASC' },
    { value: 'date-posted-desc', display: 'Date Posted DESC' },
    { value: 'salary-asc', display: 'Salary ASC' },
    { value: 'salary-desc', display: 'Salary DESC' },
  ];

  return (
    <div>
      {/* Sort */}
      <div className='flex items-center space-x-2'>
        <label
          htmlFor='sorting'
          className='block text-sm font-sm text-gray-500 italic w-full'
        >
          Sort By
        </label>
        <select
          id='sorting'
          name='sorting'
          onChange={handleChange}
          className='mt-1 block  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-sm'
          defaultValue={sortby}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JobsSortForm;
