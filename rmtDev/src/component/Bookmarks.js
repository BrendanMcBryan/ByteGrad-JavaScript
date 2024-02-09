import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from '../common.js';

import renderJobList from './JobList.js';

const clickHandler = (event) => {
  if (!event.target.className.includes('bookmark')) return;

  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // persist data with local storage
  localStorage.setItem(
    'bookmarkJobItems',
    JSON.stringify(state.bookmarkJobItems)
  );

  // update book mark icon
  document
    .querySelector('.job-info__bookmark-icon')
    .classList.toggle('job-info__bookmark-icon--bookmarked');

    // rendersearch joblist
    renderJobList();
};

// open widget on hover

const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add('bookmarks-btn--active');

  // make joblist visible
  jobListBookmarksEl.classList.add('job-list--visible');

  // render bookmarks list
  renderJobList('bookmarks');
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove('bookmarks-btn--active');

  jobListBookmarksEl.classList.remove('job-list--visible');
};

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
