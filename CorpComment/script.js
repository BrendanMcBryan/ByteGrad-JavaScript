//* Global
const MAX_CHARACTERS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');

const renderFeedbackItem = (feedbackItem) => {
  // new feedback item HTML
  const feedbackItemHTML = `
  <li class="feedback">
      <button class="upvote">
          <i class="fa-solid fa-caret-up upvote__icon"></i>
          <span class="upvote__count">${feedbackItem.upvoteCount}</span>
      </button>
      <section class="feedback__badge">
          <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
      </section>
      <div class="feedback__content">
          <p class="feedback__company">${feedbackItem.company}</p>
          <p class="feedback__text">${feedbackItem.text}</p>
      </div>
      <p class="feedback__date">${
        feedbackItem.daysAgo === 0 ? 'new' : `${feedbackItem.daysAgo}d`
      }</p>
  </li>
  `;
  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
};

// ! Counter Component
const inputHandler = () => {
  // current number of user chars
  const nrCharTyped = textAreaEl.value.length;
  // bumber of chars left
  const charLeft = MAX_CHARACTERS - nrCharTyped;
  // display characters left
  counterEl.textContent = charLeft;
};

textAreaEl.addEventListener('input', inputHandler);

//! Form Component
const showVisualIndicator = (textcheck) => {
  const className = textcheck === 'valid' ? 'form--valid' : 'form--invalid';
  formEl.classList.add(className);
  setTimeout(() => formEl.classList.remove(className), 2000);
};

const submitHandler = (event) => {
  // prevent default
  event.preventDefault();
  //get test from user
  const text = textAreaEl.value;
  // console.log(text);

  // validate text (long enough and has hashtag)
  if (text.includes('#') && text.length >= 5) {
    showVisualIndicator('valid');
  } else {
    showVisualIndicator('invalid');
    // focus text area
    textAreaEl.focus();
    return;
  }

  // extract other info from submission
  const hashtag = text.split(' ').find((word) => word.includes('#'));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  const feedbackItem = {
    upvoteCount,
    company,
    badgeLetter,
    daysAgo,
    text,
  };
  renderFeedbackItem(feedbackItem);

  // send info to db
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: 'POST',
    body: JSON.stringify(feedbackItem),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log('something went wrong');
        return;
      }

      console.log('Correctly');
    })
    .catch((error) => console.log(error));

  textAreaEl.value = '';
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARACTERS;
};

formEl.addEventListener('submit', submitHandler);

//! Feedback List Component
const clickHandler = (event) => {
  const clickedEl = event.target;

  const upvoteIntention = clickedEl.className.includes('upvote');

  if (upvoteIntention) {
    // disable the upvote button
    const upvoteBtnEl = clickedEl.closest('.upvote');
    upvoteBtnEl.disabled = true;
    const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
    let upvoteCount = +upvoteCountEl.textContent;
    upvoteCountEl.textContent = ++upvoteCount;
    // console.log(upvoteCount);
  } else {
    // expand clicked item
    clickedEl.closest('.feedback').classList.toggle('feedback--expand');
  }
  // console.log(upvoteIntention);
};

feedbackListEl.addEventListener('click', clickHandler);

fetch(`${BASE_API_URL}/feedbacks`)
  .then((response) => response.json())
  .then((data) => {
    // remove spinner
    spinnerEl.remove();

    data.feedbacks.forEach((feedbackItem) => renderFeedbackItem(feedbackItem));
  })
  .catch((error) => {
    feedbackListEl.textContent = `Failed to fetch feedback items, error message: ${error.message}`;
  });
