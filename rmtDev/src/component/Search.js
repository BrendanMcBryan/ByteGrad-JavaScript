import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  getData,
  state
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

// * SEARCH COMPONENT
const submitHandler = async (event) => {
  event.preventDefault();

  const searchText = searchInputEl.value;

  // validation (regular expression)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError('your  may not contain numbers');
    return;
  }

  searchInputEl.blur();

  // remove previous items
  jobListSearchEl.innerHTML = '';

  // reset sorting
  sortingBtnRelevantEl.classList.add('sorting__button--active');
  sortingBtnRecentEl.classList.remove('sorting__button--active');

  // render spinner
  renderSpinner('search');

  // fetch search results
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;

    state.searchJobItems = jobItems;
    state.currentPage = 1;

    renderSpinner('search');
    numberEl.textContent = jobItems.length;

    renderPaginationButtons();
    renderJobList();

  } catch (error) {
    renderSpinner('search');
    renderError(error.message);
  }
};

searchFormEl.addEventListener('submit', submitHandler);
