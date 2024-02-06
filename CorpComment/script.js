// ! Counter Component
const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputHandler = () => {
  // determine max chars
  const maxNrCharacters = 150;

  // current number of user chars
  const nrCharTyped = textAreaEl.value.length;

  // bumber of chars left
  const charLeft = maxNrCharacters - nrCharTyped;
  console.log(`text ${charLeft}`);

  // display characters left
  counterEl.textContent = charLeft;
};

textAreaEl.addEventListener('input', inputHandler);


