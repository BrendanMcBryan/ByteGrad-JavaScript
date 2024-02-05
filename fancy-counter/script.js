const counterEl = document.querySelector(".counter");
const increaseButtonEl = document.querySelector(".counter__button--increase");
const decreaseButtonEl = document.querySelector(".counter__button--decrease");
const resetButtonEl = document.querySelector(".counter__reset-button");
const counterValueEl = document.querySelector(".counter__value");
const counterTitleEl = document.querySelector(".counter__title");

resetButtonEl.addEventListener("click", () => {
  counterValueEl.textContent = 0; // counterEl.classList.remove("counter--limit");
  counterEl.classList.remove("counter--limit");
  counterTitleEl.innerHTML = "Fancy Counter";
});

decreaseButtonEl.addEventListener("click", () => {
  const currentValue = counterValueEl.textContent;
  const currentValueNumber = +currentValue;
  const newValue = currentValueNumber - 1;
  newValue < 0
    ? (counterValueEl.textContent = 0)
    : (counterValueEl.textContent = newValue);
  // newValue < 6
  //   ? (counterEl.classList.remove("counter--limit")
  //   : (counterEl.classList.add("counter--limit");
});

const incrimentCounter = () => {
  const currentValue = counterValueEl.textContent;
  const currentValueNumber = +currentValue;
  let newValue = currentValueNumber + 1;

  if (newValue > 5) {
    newValue = 5;
    counterEl.classList.add("counter--limit");
    counterTitleEl.innerHTML =
      "Limit <span style='font-weight:800;'>reached</span>!";
    // increaseButtonEl.disabled = true;
    // decreaseButtonEl.disabled = true;
  }

  counterValueEl.textContent = newValue;
};
increaseButtonEl.addEventListener("click", incrimentCounter);

document.addEventListener("keydown", incrimentCounter);
