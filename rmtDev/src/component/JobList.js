import {
  BASE_API_URL,
  jobListSearchEl,
  jobListBookmarksEl,
  jobDetailsContentEl,
  getData,
  state,
  RESULTS_PER_PAGE,
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';

// * JOBLIST COMPONENT

const renderJobList = (whichJobList = 'search') => {
  // determine correct selector for joblist (search or bookmarks)
  const jobListEl =
    whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;

  // remove previous job items
  jobListEl.innerHTML = '';

  //  determine job items
  let jobItems;
  if (whichJobList === 'search') {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    );
  } else if (whichJobList === 'bookmarks') {
    jobItems = state.bookmarkJobItems;
  }

  jobItems.forEach((jobItem) => {
    const newJobItemHTML = `
        <li class="job-item ${
          state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''
        }">
          <a class="job-item__link" href="${jobItem.id}">
              <div class="job-item__badge">${jobItem.badgeLetters}</div>
              <div class="job-item__middle">
                  <h3 class="third-heading">${jobItem.title}</h3>
                  <p class="job-item__company">${jobItem.company}</p>
                  <div class="job-item__extras">
                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                        jobItem.duration
                      }</p>
                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${
                        jobItem.salary
                      }</p>
                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                        jobItem.location
                      }</p>
                  </div>
              </div>
              <div class="job-item__right">
                  <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
                    state.bookmarkJobItems.some(
                      (bookmarkJobItem) => bookmarkJobItem.id === jobItem.id
                    ) && 'job-item__bookmark-icon--bookmarked'
                  }"></i> 
                  <time class="job-item__time">${jobItem.daysAgo}d</time>
              </div>
          </a>
        </li>
    `;
    jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML);
  });
};

const clickHandler = async (event) => {
  event.preventDefault();

  const jobItemEl = event.target.closest('.job-item');

  document
    .querySelectorAll('.job-item--active')
    .forEach((jobItemWithActiveClass) =>
      jobItemWithActiveClass.classList.remove('job-item--active')
    );

  jobDetailsContentEl.innerHTML = '';

  renderSpinner('job-details');

  const id = jobItemEl.children[0].getAttribute('href');

  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];

  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);

  renderJobList();

  history.pushState(null, '', `/#${id}`);

  // fetch job item data

  try {
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    const { jobItem } = data;

    renderSpinner('job-details');

    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner('job-details');
    renderError(error.message);
  }
};

jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);

export default renderJobList;
