import {
  BASE_API_URL,
  jobDetailsContentEl,
  getData,
  state,
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';

const loadHashChangeHandler = async () => {
  // get id from URL
  const id = window.location.hash.substring(1);
  if (id) {



    document
    .querySelectorAll('.job-item--active')
    .forEach((jobItemWithActiveClass) =>
      jobItemWithActiveClass.classList.remove('job-item--active')
    );


    jobDetailsContentEl.innerHTML = '';
    renderSpinner('job-details');
    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      const { jobItem } = data;

      state.activeJobItem = jobItem;


      renderJobList();
      renderSpinner('job-details');

      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner('job-details');
      renderError(error.message);
    }
  }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);
