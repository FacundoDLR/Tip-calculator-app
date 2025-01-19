const inputs = document.querySelectorAll(".form-group input");
const tipButtons = document.querySelectorAll(".tip-btn");
const billAmountInput = document.getElementById("billAmount");
const numPeopleInput = document.getElementById("numPeople");
const customTipInput = document.getElementById("customTip");
const tipAmountPerPerson = document.getElementById("tipAmountPerPerson");
const totalAmountPerPerson = document.getElementById("totalAmountPerPerson");
const form = document.getElementById("tipCalculator");

let selectedTip = 0;
let customTip = 0;

// Input validation
function validateInput(input) {
  const errorMessageSpan = input.parentElement.querySelector(".error-message");
  const errorText = "Can't be zero or empty";

  if (!input.value || Number(input.value) === 0) {
    input.setAttribute("title", errorText);
    errorMessageSpan.textContent = errorText;
    input.classList.add("shake", "user-invalid");
    setTimeout(() => input.classList.remove("shake"), 500);
  } else {
    input.setAttribute("title", "");
    errorMessageSpan.textContent = "";
    input.classList.remove("user-invalid");
  }
}

// Validation when losing focus in input field
inputs.forEach((input) => {
  input.onblur = () => validateInput(input);
});

// Entry values input
const getBillAmount = () => Math.max(0, parseFloat(billAmountInput.value) || 0);
const getNumPeople = () => Math.max(1, parseInt(numPeopleInput.value) || 1);

// Tip and total calculation
const calculate = () => {
  const billAmount = getBillAmount();
  const numPeople = getNumPeople();

  const tipAmount = customTip > 0
    ? (billAmount * customTip) / 100
    : (billAmount * selectedTip) / 100;

  const round = (value) => parseFloat(value.toFixed(2));
  const tipPerPerson = round(tipAmount / numPeople);
  const totalPerPerson = round((billAmount / numPeople) + tipPerPerson);

  tipAmountPerPerson.textContent = `$${tipPerPerson}`;
  totalAmountPerPerson.textContent = `$${totalPerPerson}`;
};

// Tip handler
const handleTipButtonClick = (button) => {
  tipButtons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  selectedTip = parseFloat(button.dataset.tip) || 0;
  customTipInput.value = "";
  customTip = 0;
  calculate();
};

tipButtons.forEach(button => {
  button.addEventListener("click", () => handleTipButtonClick(button));
});

// Custom tip management
customTipInput.addEventListener("input", () => {
  customTip = Math.max(0, parseFloat(customTipInput.value) || 0);
  if (customTip === 0) {
    selectedTip = 0;
    tipButtons.forEach(btn => btn.classList.remove("active"));
  }
  calculate();
});

// Bill input amount
billAmountInput.addEventListener("input", () => {
  billAmountInput.value = Math.max(0, billAmountInput.value);
  calculate();
});

// Input of the number of people
numPeopleInput.addEventListener("input", () => {
  numPeopleInput.value = Math.max(1, numPeopleInput.value);
  calculate();
});

// Form reset
form.addEventListener("reset", () => {
  customTip = 0;
  selectedTip = 0;
  tipButtons.forEach(button => button.classList.remove("active"));
  tipAmountPerPerson.textContent = "$0.00";
  totalAmountPerPerson.textContent = "$0.00";
});
