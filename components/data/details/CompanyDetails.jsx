import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import JobsList from '../lists/JobsList';

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

const CompanyDetails = ({ company, companyJobs }) => {
  console.log({ company, companyJobs });
  const jobsGroupedByCategories = groupArrayOfObjects(
    companyJobs,
    'jobCategory'
  );
  console.log('jobsGroupedByCategories = ', jobsGroupedByCategories);
  return (
    <>
      <main>
        {/* Profile background */}
        <div className='h-30 md:56 bg-slate-200'>
          <Image
            className='object-cover h-full w-full'
            src={company.coverImage.url}
            width={company.coverImage.width}
            height={company.coverImage.height}
            alt={`cover image - ${company.name} - ${company.slogan}`}
          />
        </div>

        {/* Header */}
        <header className='text-center bg-slate-50 pb-6 border-b border-slate-200'>
          <div className='px-4 sm:px-6 lg:px-8 w-full'>
            <div className='max-w-3xl mx-auto'>
              {/* Avatar */}
              <div className='-mt-12 mb-2'>
                <div className='inline-flex -ml-1 -mt-1 sm:mb-0'>
                  <Image
                    className='rounded-full border-4 border-white'
                    src={company.logo.url}
                    width={80}
                    height={80}
                    alt={`logo - ${company.name} - ${company.slogan}`}
                  />
                </div>
              </div>

              {/* Company name and info */}
              <div className='mb-4'>
                <h2 className='text-2xl text-slate-800 font-bold mb-2'>
                  {company.name}
                </h2>
                <p>{company.slogan}</p>
              </div>

              {/* Meta */}
              <div className='inline-flex flex-wrap justify-center sm:justify-start space-x-4'>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 fill-current shrink-0 text-slate-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z' />
                  </svg>
                  <span className='text-sm font-medium whitespace-nowrap text-slate-500 ml-2'>
                    {company.city}
                  </span>
                </div>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 fill-current shrink-0 text-slate-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z' />
                  </svg>
                  <a
                    className='text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-700 ml-2'
                    href={company.website}
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}

        <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
          <div className='max-w-3xl mx-auto'>
            <h3 className='text-xl leading-snug text-slate-800 font-bold mb-6'>
              Open Positions at {company.name}
            </h3>

            {/* Job lists */}
            <div className='space-y-6'>
              {jobsGroupedByCategories &&
                Object.keys(jobsGroupedByCategories).map((jobCategory) => {
                  const jobs = jobsGroupedByCategories[jobCategory];
                  return (
                    <div key={jobCategory}>
                      <h4 className='text-slate-800 font-medium mb-4'>
                        {jobCategory}
                      </h4>
                      {/* Job category list */}
                      <JobsList jobs={jobs} />
                    </div>
                  );
                })}
            </div>

            <div className='mt-6'>
              <Link href='/'>
                <a className='inline-flex justity-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <ChevronLeftIcon
                    className='mr-3 h-5 w-5'
                    aria-hidden='true'
                  />
                  All Jobs
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompanyDetails;
