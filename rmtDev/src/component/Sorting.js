import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from '../common.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const clickHandler = (event) => {
  event.preventDefault();
  const clickedBttonEl = event.target.closest('.sorting__button');

  if (!clickedBttonEl) return;

  state.currentPage = 1;

  const recent = clickedBttonEl.className.includes('--recent') ? true : false;
  if (recent) {
    sortingBtnRecentEl.classList.add('sorting__button--active');
    sortingBtnRelevantEl.classList.remove('sorting__button--active');
  } else {
    sortingBtnRelevantEl.classList.add('sorting__button--active');
    sortingBtnRecentEl.classList.remove('sorting__button--active');
  }

  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  renderPaginationButtons();
  renderJobList();
};

sortingEl.addEventListener('click', clickHandler);
