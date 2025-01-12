const billAmountInput = document.getElementById("billAmount");
const numPeopleInput = document.getElementById("numPeople");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("customTip");
const tipAmountPerPerson = document.getElementById("tipAmountPerPerson");
const totalAmountPerPerson = document.getElementById("totalAmountPerPerson");
const form = document.getElementById("tipCalculator");

// var to store the values
let selectedTip = 0;
let customTip = 0;

const getBillAmount = () => {
    const value = parseFloat(billAmountInput.value) || 0;
    return value >= 0 ? value : 0; // If the value is negative, we convert it to 0
}
const getNumPeople = () => {
    const value = parseInt(numPeopleInput.value) || 1;
    return value >= 1 ? value : 1; // If the number of people is less than 1, we convert it to 1
}

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedTip = parseFloat(button.dataset.tip);
        customTipInput.value = '';
        customTip = 0;
        /* console.log('selected tip: ' + selectedTip); */
        calculate(); // recalculate with selctedTip
    });
})

customTipInput.addEventListener('input', function () {
    customTip = parseFloat(customTipInput.value) || 0; // get custom tip value
    if (customTip < 0) {
        customTip = 0;
        customTipInput.value = '0';
    }

    if (customTip === 0) {
        selectedTip = 0; // Reset selected tip
        tipButtons.forEach(btn => btn.classList.remove('active')); // Uncheck all buttons
    }
    /* console.log('Custom tip: ' + customTip); */
    calculate(); // recalculate with custom tip
})

billAmountInput.addEventListener('input', () => {
    if (billAmountInput.value < 0) billAmountInput.value = 0;
    calculate();
})

numPeopleInput.addEventListener('input', () => {
    if (numPeopleInput.value < 1) numPeopleInput.value = 1;
    calculate();
})

const calculate = () => {

    const billAmount = getBillAmount(); // Obtain total amount
    const numPeople = getNumPeople(); // Obtain N° people

    const round = (value) => parseFloat(value.toFixed(2)); // function to round values

    // Handling custom or selected tip cases
    const tipAmount = customTip > 0
    ? (billAmount * customTip) / 100
    : (billAmount * selectedTip) / 100;

    // Divide by number of people and round
    const tipPerPerson = numPeople > 0 ? round(tipAmount / numPeople) : 0;
    const basePerPerson = numPeople > 0 ? round(billAmount / numPeople) : 0;

    const totalPerPerson = round(basePerPerson + tipPerPerson); // Total without Tip

    // Update the interface
    tipAmountPerPerson.textContent = `$${tipPerPerson}`;
    totalAmountPerPerson.textContent = `$${totalPerPerson}`;

}

form.addEventListener("reset", () => {
    // Reset all field values
    customTip = 0;
    selectedTip = 0;
    tipButtons.forEach(button => button.classList.remove("active"));
    tipAmountPerPerson.textContent = "$0.00";
    totalAmountPerPerson.textContent = "$0.00";
});

