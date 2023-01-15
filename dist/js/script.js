// DOM
const hamburger = document.querySelector(".hamburger");
const body = document.querySelector("body");
const btns = document.querySelectorAll("[data-btn]");
const cards = Array.from(document.querySelectorAll("[data-card]"));
const form = document.querySelector("form");
const nameField = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitBtn = document.querySelector('button[type="submit"]');

const hamSource = {
  false: "./assets/icon-hamburger.svg",
  true: "./assets/icon-close.svg",
};

// FUNCTIONS

function handleHam() {
  hamburger.classList.toggle("open");
  body.classList.toggle("open");
  let isOpen = hamburger.classList.contains("open");

  hamburger.src = hamSource[isOpen];
}

function handleFlip(e) {
  let name = e.currentTarget.dataset.btn;
  let target = cards.find((card) => card.dataset.card === name);

  target.classList.toggle("flipped");
}

function handleSubmit() {
  form.reset();
  form.classList.add("success");
  setTimeout(() => form.classList.remove("success"), 1000);
}

function validateSubmit() {
  if (
    !validateString(nameField.value, nameField) ||
    !validateEmail() ||
    !validateString(message.value, message)
  ) {
    submitBtn.disabled = "disabled";
    return;
  }
  submitBtn.disabled = false;
}

function validateString(input, field) {
  if (input) {
    field.classList.remove("error");
    return true;
  }
  field.classList.add("error");
  return false;
}

function checkInput(e) {
  validateString(e.target.value, e.target);
  validateSubmit();
}

function validateEmail() {
  let mailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (mailRegex.test(email.value)) {
    email.classList.remove("error");
    return true;
  }

  email.classList.add("error");
  return false;
}

//EVENT LISTENERS

hamburger?.addEventListener("click", handleHam);
btns?.forEach((btn) => btn.addEventListener("click", handleFlip));
submitBtn?.addEventListener("mouseenter", validateSubmit);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});
nameField?.addEventListener("input", checkInput);
message?.addEventListener("input", checkInput);
email?.addEventListener("input", validateSubmit);

// Typing Carousel Example
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  //   var css = document.createElement("style");
  //   css.type = "text/css";
  //   css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  //   document.body.appendChild(css);
};
