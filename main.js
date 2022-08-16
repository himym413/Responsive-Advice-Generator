"use strict";

const body = document.querySelector("body");
const btnNewAdvice = document.querySelector(".advice__new");
const adviceNumber = document.querySelector(".advice__num");
const advice = document.querySelector(".advice__text");

// Create error element
const errorContainer = document.createElement("p");
errorContainer.textContent =
  "Couldn't get advice. Please try again. Never give up!";
errorContainer.style.color = "red";
errorContainer.style.marginTop = "2rem";

// Get advice from Advice Slip API, check for error
const getAdvice = function (url) {
  errorContainer.style.display = "none";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      adviceNumber.textContent = data.slip.id;
      advice.textContent = data.slip.advice;
    })
    .catch(() => {
      errorContainer.style.display = "block";
      body.appendChild(errorContainer);
    });

  document.activeElement.blur();
};

// Click and keydown event listeners
btnNewAdvice.addEventListener("click", function () {
  getAdvice("https://api.adviceslip.com/advice");
});

btnNewAdvice.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getAdvice("https://api.adviceslip.com/advice");
});
