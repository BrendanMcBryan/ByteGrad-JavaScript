import {
  state,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  RESULTS_PER_PAGE,
} from '../common.js';

import renderJoblist from './JobList.js';

const renderPaginationButtons = () => {
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove('pagination__button--hidden');
  } else {
    paginationBtnBackEl.classList.add('pagination__button--hidden');
  }

  if (state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add('pagination__button--hidden');
  } else {
    paginationBtnNextEl.classList.remove('pagination__button--hidden');
  }

  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const clickHandler = (event) => {
  event.preventDefault();

  const clickedButtonEl = event.target.closest('.pagination__button');

  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

  nextPage ? state.currentPage++ : state.currentPage--;

  renderPaginationButtons();

  renderJoblist();
};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;
