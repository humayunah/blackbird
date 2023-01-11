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
