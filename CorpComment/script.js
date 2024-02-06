//* Global
const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');

// ! Counter Component
const inputHandler = () => {
  // determine max chars
  const maxNrCharacters = 150;

  // current number of user chars
  const nrCharTyped = textAreaEl.value.length;

  // bumber of chars left
  const charLeft = maxNrCharacters - nrCharTyped;

  // display characters left
  counterEl.textContent = charLeft;
};

textAreaEl.addEventListener('input', inputHandler);

//! Form Component

//! submit component

const submitHandler = (event) => {
  // prevent default
  event.preventDefault();
  //get test from user
  const text = textAreaEl.value;
  // console.log(text);

  // validate text (long enough and has hashtag)
  if (text.includes('#') && text.length >= 5) {
    formEl.classList.add('form--valid');
    setTimeout(() => formEl.classList.remove('form--valid'), 2000);
  } else {
    formEl.classList.add('form--invalid');
    setTimeout(() => formEl.classList.remove('form--invalid'), 2000);

    // focus text area
    textAreaEl.focus();
    return;
  }

  // extract other info from submission
  const hashtag = text.split(' ').find((word) => word.includes('#'));
  const companyName = hashtag.substring(1);
  const badgeLetter = companyName.substring(0, 1).toUpperCase();
  // console.log(badgeLetter);
  const upvoteCount = 0;
  const daysAgo = 0;

  // new feedback item HTML
  const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${companyName}</p>
            <p class="feedback__text">${text}</p>
        </div>
        <p class="feedback__date">${daysAgo === 0 ? 'new' : `${daysAgo}d`}</p>
    </li>
  `;

  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
  textAreaEl.value = '';
  submitBtnEl.blur();
  counterEl.textContent = '150';
};

formEl.addEventListener('submit', submitHandler);
