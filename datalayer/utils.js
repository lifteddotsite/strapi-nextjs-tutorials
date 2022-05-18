export const sortJobsByDatePosted = ({ jobs, ASC = true }) => {
  // we don't want to modify the original list of jobs provided
  const sorted = [...jobs];
  sorted.sort(function (job1, job2) {
    if (job1.datePosted < job2.datePosted) return ASC ? -1 : 1;
    else if (job1.datePosted > job2.datePosted) return ASC ? 1 : -1;
    else return 0;
  });
  return sorted;
};

export const sortJobsByBaseAnnualSalary = ({ jobs, ASC = true }) => {
  // we don't want to modify the original list of jobs provided
  const sorted = [...jobs];
  sorted.sort(function (job1, job2) {
    if (job1.baseAnnualSalary < job2.baseAnnualSalary) return ASC ? -1 : 1;
    else if (job1.baseAnnualSalary > job2.baseAnnualSalary) return ASC ? 1 : -1;
    else return 0;
  });
  return sorted;
};

export const sortJobsByCompanyName = ({ jobs }) => {
  // we don't want to modify the original list of jobs provided
  const sorted = [...jobs];
  sorted.sort(function (job1, job2) {
    if (job1.company.name < job2.company.name) return -1;
    else if (job1.company.name > job2.company.name) return 1;
    else return 0;
  });
  return sorted;
};
