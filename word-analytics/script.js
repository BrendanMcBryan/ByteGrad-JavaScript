const textareaEl = document.querySelector(".textarea");
const charactersNumberEl = document.querySelector(".stat__number--characters");
const wordsNumberEl = document.querySelector(".stat__number--words");
const twitterNumberEl = document.querySelector(".stat__number--twitter");
const facebookNumberEl = document.querySelector(".stat__number--facebook");

const inputHandler = () => {
  // example of input validation
  if (textareaEl.value.includes("<script>")) {
    alert(`you can't do that`);
    textareaEl.value = textareaEl.value.replace("<script>", "no no");
  }

  // determine new numbers
  const numberOfCharactersLeft = textareaEl.value.length;
  const twitterCharLeft = 280 - numberOfCharactersLeft;
  const facebookCharLeft = 2200 - numberOfCharactersLeft;
  let numberOfWords = textareaEl.value.split(" ").length;
  if (textareaEl.value.length === 0) {
    numberOfWords = 0;
  }

  // add visual indicators for tolernces

  if (twitterCharLeft < 0) {
    twitterNumberEl.classList.add("stat__number--limit");
  } else {
    twitterNumberEl.classList.remove("stat__number--limit");
  }
  if (facebookCharLeft < 0) {
    facebookNumberEl.classList.add("stat__number--limit");
  } else {
    facebookNumberEl.classList.remove("stat__number--limit");
  }

  // set new numbers
  charactersNumberEl.textContent = numberOfCharactersLeft;
  twitterNumberEl.textContent = twitterCharLeft;
  facebookNumberEl.textContent = facebookCharLeft;
  wordsNumberEl.textContent = numberOfWords;
};

textareaEl.addEventListener("input", inputHandler);
